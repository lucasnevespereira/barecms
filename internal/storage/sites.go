package storage

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

func (s *Storage) DeleteSite(id string) error {
	deleted := s.DB.Where("id = ?", id).Delete(&SiteDB{})
	if deleted.Error != nil {
		return deleted.Error
	}
	return nil
}

func (s *Storage) DeleteSitesByUserID(userID string) error {
	deleted := s.DB.Where("user_id = ?", userID).Delete(&SiteDB{})
	if deleted.Error != nil {
		return deleted.Error
	}
	return nil
}

func (s *Storage) GetSitesByUserID(userID string) ([]SiteDB, error) {
	var sites []SiteDB
	retrieved := s.DB.Where("user_id = ?", userID).Find(&sites)
	if retrieved.Error != nil {
		return nil, retrieved.Error
	}
	return sites, nil
}

func (s *Storage) GetSiteBySlug(slug string) (SiteDB, error) {
	var site SiteDB
	retrieved := s.DB.Where("slug = ?", slug).First(&site)
	if retrieved.Error != nil {
		return SiteDB{}, retrieved.Error
	}
	return site, nil
}
