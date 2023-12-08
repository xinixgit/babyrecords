package main

import (
	"flag"
	"fmt"
	"log"
	recDb "xinxin/babyrecords-service/db"
	"xinxin/babyrecords-service/middleware"
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
	jwtKey := flag.String("jwtKey", "", "jwt secret key")
	userpwd := flag.String("userPwd", "", "user password")
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

	authTokenHandler := svc.NewJwtTokenHandler([]byte(*jwtKey), svc.AuthToken)
	refreshTokenHandler := svc.NewJwtTokenHandler([]byte(*jwtKey), svc.RefreshToken)
	authHandler := svc.AuthHandler{
		AuthTokenHandler:    authTokenHandler,
		RefreshTokenhandler: refreshTokenHandler,
		UserPwd:             *userpwd,
	}

	router := gin.Default()
	tokenVerifier := middleware.VerifyToken(authTokenHandler)

	router.POST("/login", authHandler.Login)
	router.POST("/refresh", authHandler.RefreshToken)
	router.GET("/records", tokenVerifier, recHandler.GetAllRecords)
	router.GET("/record/sleep/latest", tokenVerifier, recHandler.GetLatestSleepRecord)
	router.GET("/record/summary/feedpump", tokenVerifier, recHandler.GetFeedPumpSummaryBetweenDates)
	router.POST("/record", tokenVerifier, recHandler.SaveRecord)
	router.PUT("/record/sleep", tokenVerifier, recHandler.UpdateSleepRecord)
	router.DELETE("/record", tokenVerifier, recHandler.DeleteRecord)
	router.Run(fmt.Sprintf("%s:8080", *svrhost))
}
