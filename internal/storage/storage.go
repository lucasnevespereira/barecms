package storage

import (
	"fmt"

	"github.com/pkg/errors"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

type Storage struct {
	DB *gorm.DB
}

func NewStorage() (*Storage, error) {
	database, err := openDatabase()
	if err != nil {
		return nil, err
	}
	return &Storage{DB: database}, nil
}

func openDatabase() (*gorm.DB, error) {
	var err error
	database, err := gorm.Open(sqlite.Open("barecms.db"), &gorm.Config{})
	if err != nil {
		return nil, errors.Wrap(err, "failed to connect to database")
	}

	// Migrate the schema
	if err := database.AutoMigrate(&SiteDB{}, &CollectionDB{}, &EntryDB{}); err != nil {
		return nil, errors.Wrap(err, "failed to migrate database schema")
	}

	fmt.Println("Database connection established.")

	return database, nil
}
