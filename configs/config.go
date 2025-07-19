package configs

import (
	"log/slog"
	"os"

	"github.com/spf13/viper"
)

type AppConfig struct {
	Env         string
	Debug       bool
	Port        int
	DatabaseURL string
	JWTSecret   string
}

func LoadAppConfig() AppConfig {
	viper.SetConfigFile(".env")
	viper.SetConfigType("env")

	if err := viper.ReadInConfig(); err != nil {
		slog.Warn("Could not read .env file", "error", err)
		slog.Info("Will try to read from environment variables directly")
	}

	// Enable reading from environment variables
	viper.AutomaticEnv()

	cfg := AppConfig{}

	// Load with fallback defaults
	cfg.Env = getEnvString("ENV", "dev")
	cfg.Port = getEnvInt("PORT", 8080)
	cfg.Debug = getEnvBool("DEBUG", true)
	cfg.DatabaseURL = getEnvString("DATABASE_URL", "postgresql://barecms_user:basercms_password@postgres:5432/barecms")
	cfg.JWTSecret = getEnvString("JWT_SECRET", "your-secret-key-change-this-in-production")

	return cfg
}

// Helper functions to get environment variables with fallbacks
func getEnvString(key, fallback string) string {
	if value := viper.GetString(key); value != "" {
		return value
	}
	if value := os.Getenv(key); value != "" {
		return value
	}
	return fallback
}

func getEnvInt(key string, fallback int) int {
	if value := viper.GetInt(key); value != 0 {
		return value
	}
	if value := os.Getenv(key); value != "" {
		if parsed := viper.GetInt(key); parsed != 0 {
			return parsed
		}
	}
	return fallback
}

func getEnvBool(key string, fallback bool) bool {
	if viper.IsSet(key) {
		return viper.GetBool(key)
	}
	if value := os.Getenv(key); value != "" {
		return value == "true" || value == "1"
	}
	return fallback
}
