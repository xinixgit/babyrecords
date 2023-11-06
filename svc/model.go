package svc

import "xinxin/babyrecords-service/model"

type recordType string

const (
	feedRecord   recordType = "feed"
	diaperRecord recordType = "diaper"
	sleepRecord  recordType = "sleep"
)

type createRecordRequest struct {
	recordType   recordType
	feedRecord   model.FeedRecord
	diaperRecord model.DiaperRecord
	sleepRecord  model.SleepRecord
}
