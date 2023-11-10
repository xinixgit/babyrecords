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
	dbRec, err := mapFeedRecord(rec)
	if err != nil {
		return err
	}

	_, err = r.db.NamedExec(saveRecordSql, dbRec)
	return err
}

func (r *Repo) SaveSleepRecord(rec *model.SleepRecord) error {
	dbRec, err := mapSleepRecord(rec)
	if err != nil {
		return err
	}

	_, err = r.db.NamedExec(saveRecordSql, dbRec)
	return err
}

func (r *Repo) GetFeedRecords() ([]model.FeedRecord, error) {
	dbRecords := []BabyRecord{}
	if err := r.db.Select(&dbRecords, getRecordByTypeSql, string(feedRecordType)); err != nil {
		return nil, fmt.Errorf("unable to map selected row to db records: %w", err)
	}

	records := make([]model.FeedRecord, len(dbRecords))
	for i, dbRec := range dbRecords {
		rec, err := mapToFeedRecord(&dbRec)
		if err != nil {
			return nil, err
		}
		records[i] = rec
	}
	return records, nil
}

func (r *Repo) GetSleepRecords() ([]model.SleepRecord, error) {
	dbRecords := []BabyRecord{}
	if err := r.db.Select(&dbRecords, getRecordByTypeSql, string(sleepRecordType)); err != nil {
		return nil, fmt.Errorf("unable to map selected row to db records: %w", err)
	}

	records := make([]model.SleepRecord, len(dbRecords))
	for i, dbRec := range dbRecords {
		rec, err := mapToSleepRecord(&dbRec)
		if err != nil {
			return nil, err
		}
		records[i] = rec
	}
	return records, nil
}
