package model

type TokenHandler interface {
	GenerateToken() (string, error)
	IsTokenValid(token string) (bool, error)
}
