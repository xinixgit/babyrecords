package model

import "time"

const (
	Milk     string = "milk"
	BabyFood string = "babyfood"
)

type DiaperSize string

const (
	Small DiaperSize = "S"
	Large DiaperSize = "L"
)

type FeedRecord struct {
	FoodType  string     `json:"type"`
	Vol       int        `json:"vol"`
	Unit      string     `json:"unit"`
	CreatedAt *time.Time `json:"created_at"`
}

type SleepRecord struct {
	StartTime string `json:"start_ts"`
	EndTime   string `json:"end_ts"`
}

type DiaperRecord struct {
	Size string `json:"size"`
}
