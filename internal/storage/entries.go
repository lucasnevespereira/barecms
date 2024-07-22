package storage

func (s *Storage) CreateEntry(entry EntryDB) error {
	created := s.DB.Create(&entry)
	if created.Error != nil {
		return created.Error
	}
	return nil
}

func (s *Storage) GetEntryByID(id string) (EntryDB, error) {
	var entry EntryDB
	err := s.DB.First(&entry, "id = ?", id).Error
	if err != nil {
		return entry, err
	}
	return entry, nil
}

func (s *Storage) GetEntriesByCollectionID(collectionID string) ([]EntryDB, error) {
	var entries []EntryDB
	err := s.DB.Find(&entries, "collection_id = ?", collectionID).Error
	if err != nil {
		return nil, err
	}
	return entries, nil
}
