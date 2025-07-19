package utils

import (
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/pkg/errors"
)

type Claims struct {
	UserID string `json:"user_id"`
	Email  string `json:"email"`
	jwt.RegisteredClaims
}

func GenerateJWT(userID, email, jwtSecret string) (string, error) {
	// Validate inputs
	if userID == "" {
		return "", errors.New("userID cannot be empty")
	}
	if email == "" {
		return "", errors.New("email cannot be empty")
	}
	if jwtSecret == "" {
		return "", errors.New("jwtSecret cannot be empty")
	}

	expirationTime := time.Now().Add(24 * time.Hour) // 24 hours

	claims := &Claims{
		UserID: userID,
		Email:  email,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString([]byte(jwtSecret))
	if err != nil {
		return "", errors.Wrap(err, "failed to sign token")
	}

	return tokenString, nil
}

func ValidateJWT(tokenStr, jwtSecret string) (*Claims, error) {
	if tokenStr == "" {
		return nil, errors.New("token cannot be empty")
	}
	if jwtSecret == "" {
		return nil, errors.New("jwtSecret cannot be empty")
	}

	claims := &Claims{}
	token, err := jwt.ParseWithClaims(tokenStr, claims, func(token *jwt.Token) (interface{}, error) {
		// Verify signing method
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("unexpected signing method")
		}
		return []byte(jwtSecret), nil
	})

	if err != nil {
		return nil, errors.Wrap(err, "failed to parse token")
	}

	if !token.Valid {
		return nil, errors.New("invalid token")
	}

	return claims, nil
}
