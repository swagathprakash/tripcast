package database

import "fmt"

type database struct {
	DatabaseUser     string
	DatabasePassword string
	DatabaseName     string
	DatabaseHost     string
	DatabasePort     uint16
}

func NewDatabase(DatabaseUser, DatabasePassword, DatabaseName, DatabaseHost string, DatabasePort uint16) *database {
	return &database{
		DatabaseUser:     DatabaseUser,
		DatabasePassword: DatabasePassword,
		DatabaseName:     DatabaseName,
		DatabaseHost:     DatabaseHost,
		DatabasePort:     DatabasePort,
	}
}

func (db *database) GetDatabaseURL() string {
	return fmt.Sprintf("postgres://%s:%s@%s:%d/%s?sslmode=disable", db.DatabaseUser, db.DatabasePassword, db.DatabaseHost, db.DatabasePort, db.DatabaseName)
}
