package models

import "encoding/json"

type Collection struct {
	ID      string          `json:"id"`
	SiteID  string          `json:"siteId"`
	Name    string          `json:"name"`
	Slug    string          `json:"slug"`
	Fields  json.RawMessage `json:"fields"`
	Entries []Entry         `json:"entries"`
}

type CreateCollectionRequest struct {
	SiteID string          `json:"siteId"`
	Name   string          `json:"name"`
	Fields json.RawMessage `json:"fields"`
}
