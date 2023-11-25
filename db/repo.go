package db

import (
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"xinxin/babyrecords-service/model"

	"github.com/jmoiron/sqlx"
)

type Repo struct {
	db *sqlx.DB
}

func NewRepo(db *sqlx.DB) *Repo {
	return &Repo{db: db}
}

func (r *Repo) SaveFeedRecord(rec *model.FeedRecord) error {
	return saveRecord(model.FeedRecordType, rec, r.db)
}

func (r *Repo) SaveSleepRecord(rec *model.SleepRecord) error {
	return saveRecord(model.SleepRecordType, rec, r.db)
}

func (r *Repo) SaveDiaperRecord(rec *model.DiaperRecord) error {
	return saveRecord(model.DiaperRecordType, rec, r.db)
}

func (r *Repo) SavePumpRecord(rec *model.PumpRecord) error {
	return saveRecord(model.PumpRecordType, rec, r.db)
}

func (r *Repo) UpdateSleepRecord(rec *model.SleepRecord) error {
	data, err := json.Marshal(rec)
	if err != nil {
		return err
	}

	if _, err := r.db.Exec(
		updateRecordByIDSql,
		data,
		rec.ID,
		model.SleepRecordType,
	); err != nil {
		return fmt.Errorf("unable to find sleep record by id: %s: %w", *rec.ID, err)
	}
	return nil
}

func (r *Repo) DeleteRecord(id string) error {
	if _, err := r.db.Exec(
		deleteRecordByIDSql,
		id,
	); err != nil {
		return fmt.Errorf("unable to delete record by id: %s: %w", id, err)
	}
	return nil
}

func (r *Repo) GetFeedRecords(date string) ([]model.FeedRecord, error) {
	return getRecords(date, model.FeedRecordType, mapToFeedRecord, r.db)
}

func (r *Repo) GetSleepRecords(date string) ([]model.SleepRecord, error) {
	return getRecords(date, model.SleepRecordType, mapToSleepRecord, r.db)
}

func (r *Repo) GetDiaperRecords(date string) ([]model.DiaperRecord, error) {
	return getRecords(date, model.DiaperRecordType, mapToDiaperRecord, r.db)
}

func (r *Repo) GetPumpRecords(date string) ([]model.PumpRecord, error) {
	return getRecords(date, model.PumpRecordType, mapToPumpRecord, r.db)
}

func (r *Repo) GetLatestSleepRecord() (*model.SleepRecord, error) {
	return getLatestRecord(model.SleepRecordType, mapToSleepRecord, r.db)
}

func (r *Repo) GetFeedPumpSummaryBetweenDates(fromDate string, toDate string) (model.FeedAndPumpSummary, error) {
	res := model.FeedAndPumpSummary{
		Feed: []model.DailyVol{},
		Pump: []model.DailyVol{},
	}

	var feedVols []VolSummary
	if err := r.db.Select(&feedVols, getFeedSummaryBetweenDates, fromDate, toDate); err != nil {
		return res, fmt.Errorf("unable to select feed summary between %s and %s: %w", fromDate, toDate, err)
	}

	var pumpVols []VolSummary
	if err := r.db.Select(&pumpVols, getPumpSummaryBetweenDates, fromDate, toDate); err != nil {
		return model.FeedAndPumpSummary{}, fmt.Errorf("unable to select pump summary between %s and %s: %w", fromDate, toDate, err)
	}

	for i := range feedVols {
		row := feedVols[i]
		res.Feed = append(res.Feed, model.DailyVol{Date: row.Date, Vol: row.Sum})
	}
	for i := range pumpVols {
		row := pumpVols[i]
		res.Pump = append(res.Pump, model.DailyVol{Date: row.Date, Vol: row.Sum})
	}
	return res, nil
}

func saveRecord[R model.DomainRecord](
	recType model.RecordType,
	rec *R,
	db *sqlx.DB,
) error {
	dbRec, err := mapToDBRec(recType, rec)
	if err != nil {
		return err
	}

	_, err = db.NamedExec(saveRecordSql, dbRec)
	return err
}

func getRecords[R model.DomainRecord](
	date string,
	recType model.RecordType,
	mapper func(BabyRecord) (R, error),
	db *sqlx.DB,
) ([]R, error) {
	dbRecords := []BabyRecord{}
	if err := db.Select(&dbRecords, getRecordByTypeSql, string(recType), date); err != nil {
		return nil, fmt.Errorf("unable to select %s records from db: %w", recType, err)
	}

	records := make([]R, len(dbRecords))
	for i := range dbRecords {
		rec, err := mapper(dbRecords[i])
		if err != nil {
			return nil, err
		}
		records[i] = rec
	}
	return records, nil
}

func getLatestRecord[R model.DomainRecord](
	recType model.RecordType,
	mapper func(BabyRecord) (R, error),
	db *sqlx.DB,
) (*R, error) {
	dbRecord := BabyRecord{}
	err := db.Get(&dbRecord, getLatestRecordByTypeSql, string(recType))
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			log.Printf("no latest record of type %s: %s", recType, err)
			return nil, nil
		}
		return nil, fmt.Errorf("unable to select %s records from db: %w", recType, err)
	}

	rec, err := mapper(dbRecord)
	if err != nil {
		return nil, err
	}
	return &rec, nil
}
