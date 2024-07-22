package handlers

import (
	"barecms/internal/models"

	"github.com/gin-gonic/gin"
)

func (h *Handler) CreateCollection(c *gin.Context) {
	var req models.CreateCollectionRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	err := h.Service.CreateCollection(req)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"message": "Collection created!"})
}

func (h *Handler) GetCollection(c *gin.Context) {
	id := c.Param("id")

	collection, err := h.Service.GetCollectionByID(id)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, collection)
}

func (h *Handler) GetSiteCollections(c *gin.Context) {
	id := c.Param("id")

	collections, err := h.Service.GetCollectionsBySiteID(id)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"collections": collections})
}
