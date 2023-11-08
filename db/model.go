package db

import (
	"encoding/json"
	"fmt"
	"time"
	"xinxin/babyrecords-service/model"
)

const (
	feedRecord   string = "feed"
	diaperRecord string = "diaper"
	sleepRecord  string = "sleep"
)

type BabyRecord struct {
	RecordType string    `db:"record_type"`
	Data       []byte    `db:"data"`
	CreatedAt  time.Time `db:"created_at"`
}

func mapFeedRecord(rec *model.FeedRecord) (*BabyRecord, error) {
	data, err := json.Marshal(rec)
	if err != nil {
		return nil, err
	}

	return &BabyRecord{
		RecordType: feedRecord,
		Data:       data,
		CreatedAt:  time.Now(),
	}, nil
}

func mapToFeedRecord(rec *BabyRecord) (model.FeedRecord, error) {
	var feedRec model.FeedRecord
	if err := json.Unmarshal(rec.Data, &feedRec); err != nil {
		return model.FeedRecord{}, fmt.Errorf("json unmarshal failed: %w", err)
	}
	feedRec.CreatedAt = &rec.CreatedAt
	return feedRec, nil
}
