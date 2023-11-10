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
