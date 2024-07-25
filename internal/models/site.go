package models

type Site struct {
	ID     string `json:"id"`
	Name   string `json:"name"`
	Slug   string `json:"slug"`
	UserID string `json:"userId"`
}

type CreateSiteRequest struct {
	Name   string `json:"name"`
	UserID string `json:"userId"`
}
