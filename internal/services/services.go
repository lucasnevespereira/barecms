package services

import (
	"barecms/internal/storage"
	"fmt"
)

type Service struct {
	Storage *storage.Storage
}

func NewService() *Service {
	storage, err := storage.NewStorage()
	if err != nil {
		fmt.Println("Failed to create storage:", err)
	}
	return &Service{Storage: storage}
}
