package storage

import "gorm.io/datatypes"

type SiteDB struct {
	ID          string         `gorm:"primaryKey"`
	Name        string         `gorm:"uniqueIndex;not null"`
	Slug        string         `gorm:"uniqueIndex;not null"`
	Collections []CollectionDB `gorm:"foreignKey:SiteID"`
}

func (SiteDB) TableName() string {
	return "sites"
}

type CollectionDB struct {
	ID      string         `gorm:"primaryKey"`
	Name    string         `gorm:"not null"`
	Slug    string         `gorm:"uniqueIndex;not null"`
	SiteID  string         `gorm:"not null"`
	Fields  datatypes.JSON `gorm:"type:jsonb"`
	Entries []EntryDB      `gorm:"foreignKey:CollectionID"`
}

func (CollectionDB) TableName() string {
	return "collections"
}

type EntryDB struct {
	ID           string         `gorm:"primaryKey"`
	CollectionID string         `gorm:"not null"`
	Data         datatypes.JSON `gorm:"type:jsonb"`
}

func (EntryDB) TableName() string {
	return "entries"
}
