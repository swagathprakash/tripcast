package env

import (
	"log"
	"os"
	"path/filepath"

	"github.com/joho/godotenv"
	"github.com/kelseyhightower/envconfig"
)

type EnvVariables struct {
	ApiPort uint16 `required:"true"  split_words:"true"`

	FrontEndURL string `required:"true"  split_words:"true"`

	// Database credentials
	DatabaseHost     string `required:"true"  split_words:"true"`
	DatabasePort     uint16 `required:"true"  split_words:"true"`
	DatabaseUser     string `required:"true"  split_words:"true"`
	DatabasePassword string `required:"true"  split_words:"true"`
	DatabaseName     string `required:"true"  split_words:"true"`

	// Twillio credentials
	TwillioAccountSID  string `required:"true" split_words:"true"`
	TwillioAuthID      string `required:"true" split_words:"true"`
	TwillioPhoneNumber string `required:"true" split_words:"true"`

	//gemini
	GeminiApiKey string `required:"true" split_words:"true"`
	GenModel     string `required:"true" split_words:"true"`

	// Nearby places api credentials
	PlacesAPIKey string `required:"true" split_words:"true"`
}

func NewEnvConfig() EnvVariables {
	var env EnvVariables

	dir, err := os.Getwd()
	if err != nil {
		log.Fatalf("Error getting current directory: %v", err)
	}
	dotenvPath := filepath.Join(dir, ".env.sample")

	err = godotenv.Load(dotenvPath)
	if err != nil {
		log.Fatalf("Error loading .env.sample file %s", err.Error())
	}

	err = envconfig.Process("", &env)
	if err != nil {
		log.Println(err)
	}

	return env
}
