package models

type Project struct {
	ID          string `json:"id"`
	Description string `json:"description"`
	Image       string `json:"image"`
	URL         string `json:"url"`
	SiteID      string `json:"site_id"`
}
