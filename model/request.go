package model

const (
	FeedRecordType   string = "feed"
	DiaperRecordType string = "diaper"
	SleepRecordType  string = "sleep"
)

type CreateRecordRequest struct {
	RecordType string     `json:"type"`
	FeedRecord FeedRecord `json:"feed_record"`
	// DiaperRecord DiaperRecord `json:"diaper_record"`
	// SleepRecord  SleepRecord  `json:"sleep_record"`
}
