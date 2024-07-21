package models

type Site struct {
	ID       string    `json:"id"`
	Name     string    `json:"name"`
	Slug     string    `json:"slug"`
	Projects []Project `json:"projects"`
	Articles []Article `json:"articles"`
}

type CreateSiteRequest struct {
	Name string `json:"name"`
}
