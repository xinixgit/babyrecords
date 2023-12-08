package middleware

import (
	"log"
	"net/http"
	"xinxin/babyrecords-service/model"

	"github.com/gin-gonic/gin"
)

func VerifyToken(tokenHandler model.TokenHandler) gin.HandlerFunc {
	return func(c *gin.Context) {
		token, err := c.Request.Cookie("_auth")
		if err != nil {
			log.Printf("unable to find auth cookie: %s", err)
			c.AbortWithStatusJSON(http.StatusUnauthorized, "unauthorized")
			return
		}

		isTokenValid, err := tokenHandler.IsTokenValid(token.Value)
		if err != nil {
			log.Printf("unable to parse token: %s", err)
			c.AbortWithStatusJSON(http.StatusUnauthorized, "unauthorized")
			return
		}

		if !isTokenValid {
			log.Printf("token is not valid")
			c.AbortWithStatusJSON(http.StatusUnauthorized, "unauthorized")
			return
		}

		c.Next()
	}
}
