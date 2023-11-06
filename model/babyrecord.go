package model

type FoodType string

const (
	Milk     FoodType = "milk"
	BabyFood FoodType = "babyfood"
)

type DiaperSize string

const (
	Small DiaperSize = "S"
	Large DiaperSize = "L"
)

type FeedRecord struct {
	FoodType FoodType `json:"type"`
	Vol      int      `json:"vol"`
	Unit     string   `json:"unit"`
}

type SleepRecord struct {
	StartTime string `json:"startTs"`
	EndTime   string `json:"endTs"`
}

type DiaperRecord struct {
	Size string `json:"size"`
}
