package handlers

import (
	"barecms/internal/models"
	"encoding/json"
	"net/http"
	"os"
	"path/filepath"

	"github.com/gin-gonic/gin"
)

func (h *Handler) GetProjects(c *gin.Context) {
	filePath := filepath.Join("data", "projects", "index.json")

	file, err := os.Open(filePath)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to open projects file"})
		return
	}
	defer file.Close()

	var projects []models.Project
	if err := json.NewDecoder(file).Decode(&projects); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to decode projects data"})
		return
	}

	c.JSON(http.StatusOK, projects)
}
