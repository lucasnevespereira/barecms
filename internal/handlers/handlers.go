package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func Status() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "OK"})
	}
}
