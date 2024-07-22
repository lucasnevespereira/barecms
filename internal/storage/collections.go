package storage

func (s *Storage) CreateCollection(collection CollectionDB) error {
	created := s.DB.Create(&collection)
	if created.Error != nil {
		return created.Error
	}
	return nil
}

func (s *Storage) GetCollections() ([]CollectionDB, error) {
	var collections []CollectionDB
	retrieved := s.DB.Find(&collections)
	if retrieved.Error != nil {
		return nil, retrieved.Error
	}
	return collections, nil
}

func (s *Storage) GetCollection(id string) (CollectionDB, error) {
	var collection CollectionDB
	retrieved := s.DB.Where("id = ?", id).First(&collection)
	if retrieved.Error != nil {
		return CollectionDB{}, retrieved.Error
	}
	return collection, nil
}

func (s *Storage) GetCollectionsBySiteID(siteID string) ([]CollectionDB, error) {
	var collections []CollectionDB
	retrieved := s.DB.Where("site_id = ?", siteID).Find(&collections)
	if retrieved.Error != nil {
		return nil, retrieved.Error
	}
	return collections, nil
}
