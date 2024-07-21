package handlers

import (
	"barecms/internal/models"
	"github.com/gin-gonic/gin"
)

func (h *Handler) GetSites(c *gin.Context) {
	sites, err := h.Service.GetSites()
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"sites": sites})
}

func (h *Handler) GetSite(c *gin.Context) {
	id := c.Param("id")

	site, err := h.Service.GetSite(id)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"site": site})
}

func (h *Handler) CreateSite(c *gin.Context) {
	var req models.CreateSiteRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	err := h.Service.CreateSite(req)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"message": "Site created!"})
}
