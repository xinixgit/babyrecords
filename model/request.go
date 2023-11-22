package model

const (
	Date string = "date"
)

type CreateRecordRequest struct {
	RecordType   string        `json:"type"`
	FeedRecord   *FeedRecord   `json:"feed_record"`
	DiaperRecord *DiaperRecord `json:"diaper_record"`
	SleepRecord  *SleepRecord  `json:"sleep_record"`
	PumpRecord   *PumpRecord   `json:"pump_record"`
}

type UpdateSleepRecordRequest struct {
	SleepRecord *SleepRecord `json:"sleep_record"`
}

type DeleteRecordRequest struct {
	ID string `json:"id"`
}

type GetAllRecordsResponse struct {
	FeedRecords  []FeedRecord   `json:"feed_records"`
	DiaperRecord []DiaperRecord `json:"diaper_records"`
	SleepRecord  []SleepRecord  `json:"sleep_records"`
	PumpRecord   []PumpRecord   `json:"pump_records"`
}

type GetLatestSleepRecordResponse struct {
	SleepRecord *SleepRecord `json:"sleep_record"`
}
