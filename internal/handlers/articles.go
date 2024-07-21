package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func (h *Handler) GetArticle(c *gin.Context) {
	articleSlug := c.Param("slug")
	c.JSON(http.StatusOK, gin.H{"slug": articleSlug})
}
