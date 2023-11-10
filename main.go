package main

import (
	"flag"
	"fmt"
	"log"
	recDb "xinxin/babyrecords-service/db"
	"xinxin/babyrecords-service/svc"

	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"

	_ "github.com/lib/pq"
)

func main() {
	dbhost := flag.String("h", "", "")
	dbport := flag.Int("P", -1, "")
	dbname := flag.String("d", "", "name of the db")
	dbusr := flag.String("u", "", "user of the db")
	dbpwd := flag.String("p", "", "pasword of the db")
	svrhost := flag.String("s", "", "ip of this server")
	flag.Parse()

	opts := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", *dbhost, *dbport, *dbusr, *dbpwd, *dbname)
	log.Printf("received opts: %s\n", opts)

	db, err := sqlx.Connect("postgres", opts)
	if err != nil {
		panic(err)
	}
	log.Println("db connected")

	repo := recDb.NewRepo(db)
	recHandler := svc.RecordHandler{Repo: repo}

	router := gin.Default()
	router.GET("/records", recHandler.GetAllRecords)
	router.POST("/record/save", recHandler.SaveRecord)
	router.Run(fmt.Sprintf("%s:8080", *svrhost))
}
