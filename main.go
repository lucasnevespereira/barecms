package main

import (
	"barecms/internal/router"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.Use(static.Serve("/", static.LocalFile("./ui/dist", true)))
	router.Setup(r)
	r.Run(":8080")
}
