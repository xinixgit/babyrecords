package model

import "time"

func CurrentDateStr() string {
	loc := DefaultLocation()
	return time.Now().In(loc).Format("2006-01-02")
}

func DefaultLocation() *time.Location {
	loc, _ := time.LoadLocation("America/Los_Angeles")
	return loc
}
