package svc

import (
	"net/http"
	"xinxin/babyrecords-service/db"
	"xinxin/babyrecords-service/model"

	"github.com/gin-gonic/gin"
)

type RecordHandler struct {
	Repo *db.Repo
}

func (h *RecordHandler) GetRecords(c *gin.Context) {
	records := []interface{}{
		model.FeedRecord{
			FoodType: model.Milk,
			Vol:      4,
			Unit:     "ml",
		},
	}

	c.IndentedJSON(http.StatusOK, records)
}

func (h *RecordHandler) SaveRecord(c *gin.Context) {
	var req createRecordRequest
	if err := c.BindJSON(&req); err != nil {
		return
	}
	switch req.recordType {
	case feedRecord:
		if err := h.Repo.SaveFeedRecord(&req.feedRecord); err != nil {
			break
		}
	default:
		c.JSON(http.StatusBadRequest, "bad request")
	}

	c.IndentedJSON(http.StatusCreated, "")
}
