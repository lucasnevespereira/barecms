package main

import (
	"barecms/configs"
	"barecms/internal/router"
	"barecms/internal/services"
	"fmt"
	"log/slog"

	"github.com/gin-gonic/gin"
)

type App struct {
	router *gin.Engine
	cfg    configs.AppConfig
}

func NewApp() *App {
	app := &App{}
	app.setup()
	return app
}

func (app *App) setup() {
	slog.Info("Setting up the app")
	cfg := configs.LoadAppConfig()
	svc := services.NewService(cfg)
	r := router.Setup(svc, cfg)
	app.router = r
	app.cfg = cfg
}

func (app *App) Run() {
	fmt.Printf("BareCMS running on http://localhost:%d\n", app.cfg.Port)
	if err := app.router.Run(fmt.Sprintf(":%d", app.cfg.Port)); err != nil {
		panic(fmt.Sprintf("Failed to run server: %v", err))
	}
}

func main() {
	NewApp().Run()
}
