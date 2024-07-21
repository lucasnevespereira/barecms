package main

import (
	"barecms/internal/router"
	"barecms/internal/services"
	"fmt"

	"github.com/gin-gonic/gin"
)

type App struct {
	router *gin.Engine
}

func NewApp() *App {
	app := &App{}
	app.setup()
	return app
}

func (app *App) setup() {
	fmt.Println("Setting up the app")
	svc := services.NewService()
	r := router.Setup(svc)
	app.router = r
}

func (app *App) Run() {
	if err := app.router.Run(":8080"); err != nil {
		panic(err)
	}
}

func main() {
	app := NewApp()
	app.Run()
}
