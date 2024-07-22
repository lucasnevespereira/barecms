package services

import (
	"barecms/internal/models"
	"barecms/internal/storage"
	"barecms/internal/utils"
	"encoding/json"

	"gorm.io/datatypes"
)

func (s *Service) CreateCollection(request models.CreateCollectionRequest) error {
	collection := models.Collection{
		ID:     utils.GenerateUniqueID(),
		Name:   request.Name,
		Slug:   utils.Slugify(request.Name),
		SiteID: request.SiteID,
		Fields: request.Fields,
	}
	collectionDB := mapToCollectionDB(collection)
	if err := s.Storage.CreateCollection(collectionDB); err != nil {
		return err
	}
	return nil
}

func (s *Service) GetCollectionByID(collectionID string) (models.Collection, error) {
	collectionDB, err := s.Storage.GetCollection(collectionID)
	if err != nil {
		return models.Collection{}, err
	}
	return mapToCollection(collectionDB), nil
}

func (s *Service) GetCollectionsBySiteID(siteID string) ([]models.Collection, error) {
	collectionsDB, err := s.Storage.GetCollectionsBySiteID(siteID)
	if err != nil {
		return nil, err
	}
	var collections []models.Collection
	for _, collectionDB := range collectionsDB {
		collections = append(collections, mapToCollection(collectionDB))
	}
	return collections, nil

}

func mapToCollectionDB(collection models.Collection) storage.CollectionDB {
	return storage.CollectionDB{
		ID:     collection.ID,
		Name:   collection.Name,
		Slug:   collection.Slug,
		SiteID: collection.SiteID,
		Fields: datatypes.JSON(collection.Fields),
	}
}

func mapToCollection(collectionDB storage.CollectionDB) models.Collection {
	return models.Collection{
		ID:     collectionDB.ID,
		Name:   collectionDB.Name,
		Slug:   collectionDB.Slug,
		SiteID: collectionDB.SiteID,
		Fields: json.RawMessage(collectionDB.Fields),
	}
}
