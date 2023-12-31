package db

import (
	"time"
)

type BabyRecord struct {
	ID         string    `db:"id"`
	RecordType string    `db:"record_type"`
	Data       []byte    `db:"data"`
	CreatedAt  time.Time `db:"created_at"`
}

type VolSummary struct {
	Date string `db:"date"`
	Sum  int    `db:"sum"`
}
