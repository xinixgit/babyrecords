package db

import (
	"encoding/json"
	"fmt"
	"time"
	"xinxin/babyrecords-service/model"
)

func mapToDBRec[R model.DomainRecord](recType model.RecordType, rec *R) (BabyRecord, error) {
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

func mapToFeedRecord(rec BabyRecord) (model.FeedRecord, error) {
	var feedRec model.FeedRecord
	if err := json.Unmarshal(rec.Data, &feedRec); err != nil {
		return model.FeedRecord{}, fmt.Errorf("json unmarshal failed: %w", err)
	}
	feedRec.CreatedAt = &rec.CreatedAt
	feedRec.ID = &rec.ID
	return feedRec, nil
}

func mapToSleepRecord(dbRec BabyRecord) (model.SleepRecord, error) {
	var rec model.SleepRecord
	if err := json.Unmarshal(dbRec.Data, &rec); err != nil {
		return model.SleepRecord{}, fmt.Errorf("json unmarshal failed: %w", err)
	}
	rec.CreatedAt = &dbRec.CreatedAt
	rec.ID = &dbRec.ID
	return rec, nil
}

func mapToDiaperRecord(dbRec BabyRecord) (model.DiaperRecord, error) {
	var rec model.DiaperRecord
	if err := json.Unmarshal(dbRec.Data, &rec); err != nil {
		return model.DiaperRecord{}, fmt.Errorf("json unmarshal failed: %w", err)
	}
	rec.CreatedAt = &dbRec.CreatedAt
	rec.ID = &dbRec.ID
	return rec, nil
}
