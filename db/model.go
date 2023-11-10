package db

import (
	"time"
)

type BabyRecord struct {
	RecordType string    `db:"record_type"`
	Data       []byte    `db:"data"`
	CreatedAt  time.Time `db:"created_at"`
}
