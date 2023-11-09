package svc

import (
	"log"
	"net/http"
	"xinxin/babyrecords-service/db"
	"xinxin/babyrecords-service/model"

	"github.com/gin-gonic/gin"
)

const (
	err_badrequest  = "bad request"
	err_internalerr = "internal err"
)

type RecordHandler struct {
	Repo *db.Repo
}

func (h *RecordHandler) GetAllRecords(c *gin.Context) {
	records, err := h.Repo.GetFeedRecords()
	if err != nil {
		log.Printf("unable to fetch records: %s", err)
		c.JSON(http.StatusInternalServerError, err_internalerr)
		return
	}
	c.JSON(http.StatusOK, records)
}

func (h *RecordHandler) SaveRecord(c *gin.Context) {
	var req model.CreateRecordRequest
	if err := c.BindJSON(&req); err != nil {
		// status is set automatically
		log.Printf("unable to parse req: %s", err)
		return
	}

	switch req.RecordType {
	case model.FeedRecordType:
		if err := h.Repo.SaveFeedRecord(&req.FeedRecord); err != nil {
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