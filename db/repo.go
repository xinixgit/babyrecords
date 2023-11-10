package db

import (
	"fmt"
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

func (r *Repo) GetFeedRecords() ([]model.FeedRecord, error) {
	return getRecords(model.FeedRecordType, mapToFeedRecord, r.db)
}

func (r *Repo) GetSleepRecords() ([]model.SleepRecord, error) {
	return getRecords(model.SleepRecordType, mapToSleepRecord, r.db)
}

func (r *Repo) GetDiaperRecords() ([]model.DiaperRecord, error) {
	return getRecords(model.DiaperRecordType, mapToDiaperRecord, r.db)
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
	recType model.RecordType,
	mapper func(*BabyRecord) (R, error),
	db *sqlx.DB,
) ([]R, error) {
	dbRecords := []BabyRecord{}
	if err := db.Select(&dbRecords, getRecordByTypeSql, string(recType)); err != nil {
		return nil, fmt.Errorf("unable to select %s records from db: %w", recType, err)
	}

	records := make([]R, len(dbRecords))
	for i, dbRec := range dbRecords {
		rec, err := mapper(&dbRec)
		if err != nil {
			return nil, err
		}
		records[i] = rec
	}
	return records, nil
}
