package db

import (
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
