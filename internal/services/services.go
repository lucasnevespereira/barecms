package services

import (
	"barecms/configs"
	"barecms/internal/storage"
	"fmt"
)

type Service struct {
	Storage *storage.Storage
	Config  configs.AppConfig
}

func NewService(config configs.AppConfig) *Service {
	storage, err := storage.NewStorage(config.DatabaseURL)
	if err != nil {
		fmt.Println("Failed to create storage:", err)
	}
	return &Service{Storage: storage, Config: config}
}
