package main

import (
	recDb "xinxin/babyrecords-service/db"
	"xinxin/babyrecords-service/svc"

	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"
)

func main() {
	db, err := sqlx.Connect("postgres", "user=foo dbname=bar sslmode=disable")
	if err != nil {
		panic(err)
	}

	repo := recDb.NewRepo(db)
	recHandler := svc.RecordHandler{Repo: repo}

	router := gin.Default()
	router.GET("/records", recHandler.GetRecords)
	router.POST("/record", recHandler.SaveRecord)
	router.Run("localhost:8080")
}
