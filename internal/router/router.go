package router

import (
	"barecms/configs"
	"barecms/internal/handlers"
	"barecms/internal/middlewares"
	"barecms/internal/services"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

func Setup(service *services.Service, config configs.AppConfig) *gin.Engine {
	router := gin.New()
	router.Use(gin.Logger())
	router.Use(gin.Recovery())

	// Serve static files
	router.Use(static.Serve("/", static.LocalFile("./ui/dist", true)))
	// Fallback to index.html for client-side routing
	router.NoRoute(func(c *gin.Context) {
		c.File("./ui/dist/index.html")
	})

	h := handlers.NewHandler(service, config)
	api := router.Group("/api")
	{
		api.GET("/status", h.Status)

		// Public site data endpoint
		api.GET("/:siteSlug/data", h.GetSiteData)

		// Auth routes (public)
		auth := api.Group("/auth")
		{
			auth.POST("/register", h.Register)
			auth.POST("/login", h.Login)

			// Protected auth routes
			authProtected := auth.Group("/")
			authProtected.Use(middlewares.AuthMiddleware(config))
			{
				authProtected.GET("/user", h.GetUser)
				authProtected.DELETE("/user/:userId", h.DeleteUser)
			}
		}

		// Protected routes
		protected := api.Group("/")
		protected.Use(middlewares.AuthMiddleware(config))
		{
			// Sites routes
			protected.GET("/sites", h.GetSites)
			protected.GET("/sites/:id", h.GetSite)
			protected.POST("/sites", h.CreateSite)
			protected.DELETE("/sites/:id", h.DeleteSite)
			protected.GET("/sites/:id/collections", h.GetSiteCollections)

			// Collections routes
			protected.POST("/collections", h.CreateCollection)
			protected.GET("/collections/:id", h.GetCollection)
			protected.DELETE("/collections/:id", h.DeleteCollection)
			protected.GET("/collections/:id/entries", h.GetCollectionEntries)

			// Entries routes
			protected.POST("/entries", h.CreateEntry)
			protected.GET("/entries/:id", h.GetEntry)
			protected.DELETE("/entries/:id", h.DeleteEntry)
		}
	}

	return router
}
