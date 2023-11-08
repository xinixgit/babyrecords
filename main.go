package main

import (
	recDb "xinxin/babyrecords-service/db"
	"xinxin/babyrecords-service/svc"

	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"

	_ "github.com/lib/pq"
)

func main() {
	db, err := sqlx.Connect("postgres", "host=localhost port=5433 user=postgres password=docker_user dbname=postgres sslmode=disable")
	if err != nil {
		panic(err)
	}

	repo := recDb.NewRepo(db)
	recHandler := svc.RecordHandler{Repo: repo}

	router := gin.Default()
	router.GET("/record/all", recHandler.GetAllRecords)
	router.POST("/record/save", recHandler.SaveRecord)
	router.Run("localhost:8080")
}
