package svc

import (
	"log"
	"net/http"
	"xinxin/babyrecords-service/model"

	"github.com/gin-gonic/gin"
)

type AuthHandler struct {
	AuthTokenHandler    model.TokenHandler
	RefreshTokenhandler model.TokenHandler
	UserPwd             string
}

func (h *AuthHandler) Login(c *gin.Context) {
	var req model.LoginRequest
	if err := c.BindJSON(&req); err != nil {
		// status is set automatically
		log.Printf("unable to parse req: %s", err)
		return
	}

	if req.Password != h.UserPwd {
		c.JSON(http.StatusUnauthorized, err_unauthorized)
		return
	}

	authToken, err := h.AuthTokenHandler.GenerateToken()
	if err != nil {
		log.Printf("unable to generate auth token: %s", err)
		c.JSON(http.StatusUnauthorized, err_unauthorized)
		return
	}

	refreshToken, err := h.RefreshTokenhandler.GenerateToken()
	if err != nil {
		log.Printf("unable to generate refresh token: %s", err)
		c.JSON(http.StatusUnauthorized, err_unauthorized)
		return
	}

	c.JSON(http.StatusOK, model.LoginResponse{
		AuthToken:    authToken,
		RefreshToken: refreshToken,
	})
}

func (h *AuthHandler) RefreshToken(c *gin.Context) {
	var req model.RefreshTokenRequest
	if err := c.BindJSON(&req); err != nil {
		// status is set automatically
		log.Printf("unable to parse req: %s", err)
		return
	}

	ok, err := h.RefreshTokenhandler.IsTokenValid(req.RefreshToken)
	if err != nil {
		log.Printf("validate refresh token failed: %s", err)
		c.JSON(http.StatusUnauthorized, err_unauthorized)
		return
	}

	if !ok {
		log.Printf("token is not valid")
		c.JSON(http.StatusUnauthorized, err_unauthorized)
		return
	}

	authToken, err := h.AuthTokenHandler.GenerateToken()
	if err != nil {
		log.Printf("unable to generate auth token: %s", err)
		c.JSON(http.StatusUnauthorized, err_unauthorized)
		return
	}

	c.JSON(http.StatusOK, model.RefreshTokenResponse{
		AuthToken: authToken,
	})
}
