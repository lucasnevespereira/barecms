package models

type Article struct {
	ID      string `json:"id"`
	Title   string `json:"title"`
	Content string `json:"content"`
	SiteID  string `json:"site_id"`
}
