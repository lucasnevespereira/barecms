package storage

type SiteDB struct {
	ID       string      `gorm:"primaryKey"`
	Name     string      `gorm:"uniqueIndex;not null"`
	Slug     string      `gorm:"uniqueIndex;not null"`
	Projects []ProjectDB `gorm:"foreignKey:SiteID"`
	Articles []ArticleDB `gorm:"foreignKey:SiteID"`
}

func (SiteDB) TableName() string {
	return "sites"
}

type ProjectDB struct {
	ID          string `gorm:"primaryKey"`
	Name        string `gorm:"not null"`
	Description string
	Image       string
	URL         string
	SiteID      string `gorm:"not null"`
}

func (ProjectDB) TableName() string {
	return "projects"
}

func (ArticleDB) TableName() string {
	return "articles"
}

type ArticleDB struct {
	ID      string `gorm:"primaryKey"`
	Title   string `gorm:"not null"`
	Content string
	SiteID  string `gorm:"not null"`
}
