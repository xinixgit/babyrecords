package svc

import (
	"time"
	"xinxin/babyrecords-service/model"

	"github.com/golang-jwt/jwt/v4"
)

const (
	authTokenTTL    time.Duration = 24 * time.Hour      // 24 hours
	refreshTokenTTL time.Duration = 30 * 24 * time.Hour // 30 days
)

type TokenType int

const (
	RefreshToken TokenType = iota
	AuthToken
)

type Claims struct {
	RegisteredClaims jwt.RegisteredClaims
}

type jwtTokenHandler struct {
	secretKey []byte
	ttl       time.Duration
}

func NewJwtTokenHandler(secretKey []byte, tokenType TokenType) model.TokenHandler {
	var ttl time.Duration
	switch tokenType {
	case RefreshToken:
		ttl = refreshTokenTTL
	case AuthToken:
		ttl = authTokenTTL
	}

	return &jwtTokenHandler{secretKey: secretKey, ttl: ttl}
}

func (h *jwtTokenHandler) GenerateToken() (string, error) {
	expirationTime := time.Now().Add(h.ttl)
	claims := &jwt.RegisteredClaims{
		ExpiresAt: jwt.NewNumericDate(expirationTime),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(h.secretKey)
}

func (h *jwtTokenHandler) IsTokenValid(tokenStr string) (bool, error) {
	token, err := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
		return h.secretKey, nil
	})

	if err != nil {
		return false, err
	}

	return token.Valid, nil
}

func (h *jwtTokenHandler) GetTokenTTL() time.Duration {
	return h.ttl
}
