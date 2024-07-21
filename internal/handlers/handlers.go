package handlers

import (
	"barecms/internal/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Handler struct {
	Service *services.Service
}

func NewHandler(service *services.Service) *Handler {
	return &Handler{Service: service}
}

func (h *Handler) Status(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"status": "OK"})
}
