package router

import (
	"barecms/internal/handlers"

	"github.com/gin-gonic/gin"
)

func Setup(router *gin.Engine) {
	api := router.Group("/api")
	{
		api.GET("/status", handlers.Status())
		api.GET("/projects", handlers.GetProjects())
		api.GET("/articles/:slug", handlers.GetArticle())
	}
}
