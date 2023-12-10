package model

import "time"

type TokenHandler interface {
	GenerateToken() (string, error)
	IsTokenValid(token string) (bool, error)
	GetTokenTTL() time.Duration
}
