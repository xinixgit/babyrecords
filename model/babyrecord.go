package model

import "time"

const (
	Milk     string = "milk"
	BabyFood string = "babyfood"
)

const (
	Small string = "S"
	Large string = "L"
)

type RecordType string

const (
	FeedRecordType   RecordType = "feed"
	DiaperRecordType RecordType = "diaper"
	SleepRecordType  RecordType = "sleep"
)

type DomainRecord interface {
	FeedRecord | SleepRecord | DiaperRecord
}

type FeedRecord struct {
	FoodType  string     `json:"type"`
	Vol       int        `json:"vol"`
	Unit      string     `json:"unit"`
	CreatedAt *time.Time `json:"created_at"`
}

type SleepRecord struct {
	StartTime string     `json:"start_ts"`
	EndTime   string     `json:"end_ts"`
	CreatedAt *time.Time `json:"created_at"`
}

type DiaperRecord struct {
	Size      string     `json:"size"`
	CreatedAt *time.Time `json:"created_at"`
}
