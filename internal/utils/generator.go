package utils

import "github.com/google/uuid"

func GenerateUniqueID() string {
	id := uuid.New()
	return id.String()
}
