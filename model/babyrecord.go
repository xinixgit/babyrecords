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
	PumpRecordType   RecordType = "pump"
)

type DomainRecord interface {
	FeedRecord | SleepRecord | DiaperRecord | PumpRecord
}

type FeedRecord struct {
	ID        *string    `json:"id"`
	FoodType  string     `json:"type"`
	Vol       int        `json:"vol"`
	Unit      string     `json:"unit"`
	Time      string     `json:"time"`
	CreatedAt *time.Time `json:"created_at"`
}

type SleepRecord struct {
	ID        *string    `json:"id"`
	StartTime string     `json:"start_time"`
	EndTime   string     `json:"end_time"`
	CreatedAt *time.Time `json:"created_at"`
}

type DiaperRecord struct {
	ID        *string    `json:"id"`
	Size      string     `json:"size"`
	Time      string     `json:"time"`
	CreatedAt *time.Time `json:"created_at"`
}

type PumpRecord struct {
	ID        *string    `json:"id"`
	Vol       int        `json:"vol"`
	Time      string     `json:"time"`
	CreatedAt *time.Time `json:"created_at"`
}
