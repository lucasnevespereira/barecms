package models

import "encoding/json"

type Site struct {
	ID          string       `json:"id"`
	Name        string       `json:"name"`
	Slug        string       `json:"slug"`
	Collections []Collection `json:"collections"`
}

type Entry struct {
	ID           string          `json:"id"`
	CollectionID string          `json:"collection_id"`
	Data         json.RawMessage `json:"data"`
}

type CreateSiteRequest struct {
	Name string `json:"name"`
}
