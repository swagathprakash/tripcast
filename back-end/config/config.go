package config

type Config struct {
	DatabaseUser     string
	DatabasePassword string
	DatabaseName     string
	DatabaseHost     string
	DatabasePort     string
}

const (
	DatabaseUser     = "tripcast"
	DatabasePassword = "tripcast"
	DatabaseName     = "tripcast"
	DatabaseHost     = "tripcast-db"
	DatabasePort     = "5432"
)

func NewConfig() *Config {
	return &Config{
		DatabaseUser:     DatabaseUser,
		DatabasePassword: DatabasePassword,
		DatabaseName:     DatabaseName,
		DatabaseHost:     DatabaseHost,
		DatabasePort:     DatabasePort,
	}
}

func (config *Config) GetDatabaseURL() string {
	return "postgres://" + config.DatabaseUser + ":" + config.DatabasePassword + "@" + config.DatabaseHost + ":" + config.DatabasePort + "/" + config.DatabaseName + "?sslmode=disable"
}
