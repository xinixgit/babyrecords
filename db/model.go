package db

import (
	"encoding/json"
	"fmt"
	"time"
	"xinxin/babyrecords-service/model"
)

type recordType string

const (
	feedRecordType   recordType = "feed"
	diaperRecordType recordType = "diaper"
	sleepRecordType  recordType = "sleep"
)

type BabyRecord struct {
	RecordType string    `db:"record_type"`
	Data       []byte    `db:"data"`
	CreatedAt  time.Time `db:"created_at"`
}

func mapFeedRecord(rec *model.FeedRecord) (BabyRecord, error) {
	return mapToBabyRecord(feedRecordType, rec)
}

func mapSleepRecord(rec *model.SleepRecord) (BabyRecord, error) {
	return mapToBabyRecord(sleepRecordType, rec)
}

func mapToFeedRecord(rec *BabyRecord) (model.FeedRecord, error) {
	var feedRec model.FeedRecord
	if err := json.Unmarshal(rec.Data, &feedRec); err != nil {
		return model.FeedRecord{}, fmt.Errorf("json unmarshal failed: %w", err)
	}
	createdAt := rec.CreatedAt.Add(0)
	feedRec.CreatedAt = &createdAt
	return feedRec, nil
}

func mapToSleepRecord(dbRec *BabyRecord) (model.SleepRecord, error) {
	var rec model.SleepRecord
	if err := json.Unmarshal(dbRec.Data, &rec); err != nil {
		return model.SleepRecord{}, fmt.Errorf("json unmarshal failed: %w", err)
	}
	createdAt := dbRec.CreatedAt.Add(0)
	rec.CreatedAt = &createdAt
	return rec, nil
}

func mapToBabyRecord(recType recordType, rec any) (BabyRecord, error) {
	data, err := json.Marshal(rec)
	if err != nil {
		return BabyRecord{}, err
	}

	return BabyRecord{
		RecordType: string(recType),
		Data:       data,
		CreatedAt:  time.Now(),
	}, nil
}
