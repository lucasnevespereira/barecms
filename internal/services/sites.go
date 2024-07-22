package services

import (
	"barecms/internal/models"
	"barecms/internal/storage"
	"barecms/internal/utils"
)

func (s *Service) GetSites() ([]models.Site, error) {
	sitesDB, err := s.Storage.GetSites()
	if err != nil {
		return nil, err
	}

	sites := make([]models.Site, 0)
	for _, siteDB := range sitesDB {
		site := mapToSite(siteDB)
		sites = append(sites, site)
	}

	return sites, nil
}

func (s *Service) GetSite(id string) (models.Site, error) {
	siteDB, err := s.Storage.GetSite(id)
	if err != nil {
		return models.Site{}, err
	}

	site := mapToSite(siteDB)
	return site, nil
}

func (s *Service) CreateSite(request models.CreateSiteRequest) error {
	newSite := models.Site{
		ID:   utils.GenerateUniqueID(),
		Name: request.Name,
		Slug: utils.Slugify(request.Name),
	}
	siteDB := mapToSiteDB(newSite)
	if err := s.Storage.CreateSite(siteDB); err != nil {
		return err
	}

	return nil
}

func (s *Service) DeleteSite(id string) error {
	if err := s.Storage.DeleteSite(id); err != nil {
		return err
	}
	return nil
}

func mapToSiteDB(site models.Site) storage.SiteDB {
	return storage.SiteDB{
		ID:   site.ID,
		Name: site.Name,
		Slug: site.Slug,
	}
}

func mapToSite(siteDB storage.SiteDB) models.Site {

	return models.Site{
		ID:   siteDB.ID,
		Name: siteDB.Name,
		Slug: siteDB.Slug,
	}
}
