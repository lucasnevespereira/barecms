package router

import (
	"barecms/internal/handlers"
	"barecms/internal/services"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

func Setup(service *services.Service) *gin.Engine {
	router := gin.New()

	// Serve static files
	router.Use(static.Serve("/", static.LocalFile("./ui/dist", true)))
	// Fallback to index.html for client-side routing
	router.NoRoute(func(c *gin.Context) {
		c.File("./ui/dist/index.html")
	})
	h := handlers.NewHandler(service)
	api := router.Group("/api")
	{
		api.GET("/status", h.Status)

		api.GET("/sites", h.GetSites)
		api.GET("/sites/:id", h.GetSite)
		api.POST("/sites", h.CreateSite)
		api.DELETE("/sites/:id", h.DeleteSite)
		api.GET("/sites/:id/collections", h.GetSiteCollections)

		api.POST("/collections", h.CreateCollection)
		api.GET("/collections/:id", h.GetCollection)
		api.DELETE("/collections/:id", h.DeleteCollection)
		api.GET("/collections/:id/entries", h.GetCollectionEntries)

		api.POST("/entries", h.CreateEntry)
		api.GET("/entries/:id", h.GetEntry)
		api.DELETE("/entries/:id", h.DeleteEntry)

		auth := api.Group("/auth")
		auth.POST("/register", h.Register)
		auth.POST("/login", h.Login)
		auth.GET("/user", h.GetUser)
		auth.DELETE("/user/:userId", h.DeleteUser)
	}

	return router
}
