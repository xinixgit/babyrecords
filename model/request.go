package model

const (
	Date     string = "date"
	FromDate string = "from_date"
	ToDate   string = "to_date"
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

type LoginRequest struct {
	Password string `json:"password"`
}

type LoginResponse struct {
	AuthToken       string `json:"auth_token"`
	AuthTokenTTL    int    `json:"auth_token_ttl"` // ttl in seconds
	RefreshToken    string `json:"refresh_token"`
	RefreshTokenTTL int    `json:"refresh_token_ttl"` // ttl in seconds
}

type RefreshTokenRequest struct {
	RefreshToken string `json:"refresh_token"`
}

type RefreshTokenResponse struct {
	AuthToken    string `json:"auth_token"`
	AuthTokenTTL int    `json:"auth_token_ttl"`
}
