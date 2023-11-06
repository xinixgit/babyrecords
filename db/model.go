package db

import (
	"encoding/json"
	"time"
	"xinxin/babyrecords-service/model"
)

type recordType string

const (
	feedRecord   recordType = "feed"
	diaperRecord recordType = "diaper"
	sleepRecord  recordType = "sleep"
)

type babyRecord struct {
	recordType recordType
	data       interface{}
	createdAt  time.Time
}

func mapFeedRecord(rec *model.FeedRecord) (*babyRecord, error) {
	data, err := json.Marshal(rec)
	if err != nil {
		return nil, err
	}

	return &babyRecord{
		recordType: feedRecord,
		data:       data,
		createdAt:  time.Now(),
	}, nil
}
