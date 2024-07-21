package storage

import (
	"fmt"
	"github.com/pkg/errors"
	sqlite "gorm.io/driver/sqlite"
	"gorm.io/gorm"

	"barecms/internal/models"
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
	if err := database.AutoMigrate(&models.Site{}, &models.Project{}, &models.Article{}); err != nil {
		return nil, errors.Wrap(err, "failed to migrate database schema")
	}

	fmt.Println("Database connection established.")

	return database, nil
}

func (s *Storage) CreateSite(site SiteDB) error {
	created := s.DB.Create(&site)
	if created.Error != nil {
		return created.Error
	}
	return nil
}

func (s *Storage) GetSites() ([]SiteDB, error) {
	var sites []SiteDB
	retrieved := s.DB.Find(&sites)
	if retrieved.Error != nil {
		return nil, retrieved.Error
	}
	return sites, nil
}

func (s *Storage) GetSite(id string) (SiteDB, error) {
	var site SiteDB
	retrieved := s.DB.Where("id = ?", id).First(&site)
	if retrieved.Error != nil {
		return SiteDB{}, retrieved.Error
	}
	return site, nil
}
