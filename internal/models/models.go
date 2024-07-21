package models

type Project struct {
	ID          int    `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
}

type Article struct {
	Title   string `json:"title"`
	Slug    string `json:"slug"`
	Content string `json:"content"`
}
