package models

type Site struct {
	ID          string       `json:"id"`
	Name        string       `json:"name"`
	Slug        string       `json:"slug"`
	Collections []Collection `json:"collections"`
}

type CreateSiteRequest struct {
	Name string `json:"name"`
}
