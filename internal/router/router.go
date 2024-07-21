package router

import (
	"barecms/internal/handlers"
	"barecms/internal/services"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

func Setup(service *services.Service) *gin.Engine {
	router := gin.New()
	router.Use(static.Serve("/", static.LocalFile("./ui/dist", true)))
	// Fallback to index.html for client-side routing
	router.NoRoute(func(c *gin.Context) {
		c.File("./ui/dist/index.html")
	})
	h := handlers.NewHandler(service)
	api := router.Group("/api")
	{
		api.GET("/status", h.Status)

		// sites
		api.GET("/sites", h.GetSites)
		api.GET("/sites/:id", h.GetSite)
		api.POST("/sites", h.CreateSite)

		// projects
		api.GET("/projects", h.GetProjects)

		// articles
		api.GET("/articles/:slug", h.GetArticle)
	}

	return router
}
