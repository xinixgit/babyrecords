package svc

import (
	"fmt"
	"log"
	"net/http"
	"xinxin/babyrecords-service/db"
	"xinxin/babyrecords-service/model"

	"github.com/gin-gonic/gin"
)

const (
	err_badrequest   = "bad request"
	err_internalerr  = "internal err"
	err_unauthorized = "unauthorized"
)

type RecordHandler struct {
	Repo *db.Repo
}

func (h *RecordHandler) GetAllRecords(c *gin.Context) {
	date := c.Query(model.Date)
	if date == "" {
		date = model.CurrentDateStr()
	}

	feedRecs, err := h.Repo.GetFeedRecords(date)
	if err != nil {
		log.Printf("unable to fetch feed records: %s", err)
		c.JSON(http.StatusInternalServerError, err_internalerr)
		return
	}

	sleepRecs, err := h.Repo.GetSleepRecords(date)
	if err != nil {
		log.Printf("unable to fetch sleep records: %s", err)
		c.JSON(http.StatusInternalServerError, err_internalerr)
		return
	}

	diaperRecs, err := h.Repo.GetDiaperRecords(date)
	if err != nil {
		log.Printf("unable to fetch diaper records: %s", err)
		c.JSON(http.StatusInternalServerError, err_internalerr)
		return
	}

	pumpRecs, err := h.Repo.GetPumpRecords(date)
	if err != nil {
		log.Printf("unable to fetch pump records: %s", err)
		c.JSON(http.StatusInternalServerError, err_internalerr)
		return
	}

	resp := model.GetAllRecordsResponse{
		FeedRecords:  feedRecs,
		DiaperRecord: diaperRecs,
		SleepRecord:  sleepRecs,
		PumpRecord:   pumpRecs,
	}
	c.JSON(http.StatusOK, resp)
}

func (h *RecordHandler) SaveRecord(c *gin.Context) {
	var req model.CreateRecordRequest
	if err := c.BindJSON(&req); err != nil {
		// status is set automatically
		log.Printf("unable to parse req: %s", err)
		return
	}

	if err := validate(req); err != nil {
		log.Printf("unable to save: %s", err)
		c.JSON(http.StatusInternalServerError, err_badrequest)
		return
	}

	switch req.RecordType {
	case string(model.FeedRecordType):
		if err := h.Repo.SaveFeedRecord(req.FeedRecord); err != nil {
			log.Printf("unable to save: %s", err)
			c.JSON(http.StatusInternalServerError, err_badrequest)
			return
		}
	case string(model.SleepRecordType):
		if err := h.Repo.SaveSleepRecord(req.SleepRecord); err != nil {
			log.Printf("unable to save: %s", err)
			c.JSON(http.StatusInternalServerError, err_badrequest)
			return
		}
	case string(model.DiaperRecordType):
		if err := h.Repo.SaveDiaperRecord(req.DiaperRecord); err != nil {
			log.Printf("unable to save: %s", err)
			c.JSON(http.StatusInternalServerError, err_badrequest)
			return
		}
	case string(model.PumpRecordType):
		if err := h.Repo.SavePumpRecord(req.PumpRecord); err != nil {
			log.Printf("unable to save: %s", err)
			c.JSON(http.StatusInternalServerError, err_badrequest)
			return
		}
	default:
		log.Printf("unable to find the record type: %s", req.RecordType)
		c.JSON(http.StatusInternalServerError, err_badrequest)
		return
	}

	c.JSON(http.StatusOK, "")
}

func (h *RecordHandler) GetLatestSleepRecord(c *gin.Context) {
	rec, err := h.Repo.GetLatestSleepRecord()
	if err != nil {
		log.Printf("unable to fetch latest sleep record: %s", err)
		c.JSON(http.StatusInternalServerError, err_internalerr)
		return
	}
	resp := model.GetLatestSleepRecordResponse{
		SleepRecord: rec,
	}
	c.JSON(http.StatusOK, resp)
}

func (h *RecordHandler) GetFeedPumpSummaryBetweenDates(c *gin.Context) {
	fromDate := c.Query(model.FromDate)
	toDate := c.Query(model.ToDate)
	if fromDate == "" || toDate == "" {
		log.Printf("fromDate %s or toDate %s is empty", fromDate, toDate)
		c.JSON(http.StatusInternalServerError, err_internalerr)
		return
	}

	summary, err := h.Repo.GetFeedPumpSummaryBetweenDates(fromDate, toDate)
	if err != nil {
		log.Printf("unable to fetch feed n pump summary by dates: %s", err)
		c.JSON(http.StatusInternalServerError, err_internalerr)
		return
	}

	c.JSON(http.StatusOK, summary)
}

func (h *RecordHandler) UpdateSleepRecord(c *gin.Context) {
	var req model.UpdateSleepRecordRequest
	if err := c.BindJSON(&req); err != nil {
		// status is set automatically
		log.Printf("unable to parse req: %s", err)
		return
	}
	err := h.Repo.UpdateSleepRecord(req.SleepRecord)
	if err != nil {
		log.Printf("unable to fetch latest sleep record: %s", err)
		c.JSON(http.StatusInternalServerError, err_internalerr)
		return
	}
	c.JSON(http.StatusOK, "")
}

func validate(req model.CreateRecordRequest) error {
	if req.FeedRecord == nil && req.DiaperRecord == nil && req.SleepRecord == nil && req.PumpRecord == nil {
		return fmt.Errorf("no record data is found on this req")
	}
	return nil
}

func (h *RecordHandler) DeleteRecord(c *gin.Context) {
	var req model.DeleteRecordRequest
	if err := c.BindJSON(&req); err != nil {
		// status is set automatically
		log.Printf("unable to parse req: %s", err)
		return
	}
	err := h.Repo.DeleteRecord(req.ID)
	if err != nil {
		log.Printf("unable to delete record: %s", err)
		c.JSON(http.StatusInternalServerError, err_internalerr)
		return
	}
	c.JSON(http.StatusOK, "")
}
