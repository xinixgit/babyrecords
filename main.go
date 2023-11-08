package main

import (
	"flag"
	"fmt"
	recDb "xinxin/babyrecords-service/db"
	"xinxin/babyrecords-service/svc"

	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"

	_ "github.com/lib/pq"
)

func main() {
	dbhost := flag.String("dbhost", "", "")
	dbport := flag.Int("dbport", -1, "")
	dbname := flag.String("dbname", "", "name of the db")
	dbusr := flag.String("dbusr", "", "user of the db")
	dbpwd := flag.String("dbpwd", "", "pasword of the db")

	opts := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", *dbhost, *dbport, *dbusr, *dbpwd, *dbname)
	db, err := sqlx.Connect(*dbname, opts)
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
