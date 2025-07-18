package services

import (
	"barecms/internal/models"
	"barecms/internal/storage"
	"barecms/internal/utils"
	"encoding/json"

	"gorm.io/datatypes"
)

func (s *Service) CreateEntry(request *models.CreateEntryRequest) error {
	entry := models.Entry{
		ID:           utils.GenerateUniqueID(),
		CollectionID: request.CollectionID,
		Data:         request.Data,
	}
	entryDB := mapToEntryDB(entry)

	if err := s.Storage.CreateEntry(entryDB); err != nil {
		return err
	}

	return nil
}

func (s *Service) GetEntryByID(id string) (models.Entry, error) {
	entryDB, err := s.Storage.GetEntryByID(id)
	if err != nil {
		return models.Entry{}, err
	}
	return mapToEntry(entryDB), nil
}

func (s *Service) GetEntriesByCollectionID(collectionID string) ([]models.Entry, error) {
	entriesDB, err := s.Storage.GetEntriesByCollectionID(collectionID)
	if err != nil {
		return nil, err
	}
	entries := make([]models.Entry, len(entriesDB))
	for i, entryDB := range entriesDB {
		entries[i] = mapToEntry(entryDB)
	}
	return entries, nil
}

func (s *Service) DeleteEntry(id string) error {
	return s.Storage.DeleteEntry(id)
}

func mapToEntryDB(entry models.Entry) storage.EntryDB {
	return storage.EntryDB{
		ID:           entry.ID,
		CollectionID: entry.CollectionID,
		Data:         datatypes.JSON(entry.Data),
	}
}

func mapToEntry(entryDB storage.EntryDB) models.Entry {
	return models.Entry{
		ID:           entryDB.ID,
		CollectionID: entryDB.CollectionID,
		Data:         json.RawMessage(entryDB.Data),
	}
}
