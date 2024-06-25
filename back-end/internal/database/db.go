package database

import (
	"database/sql"
	"fmt"
	"log"
)

type database struct {
	DatabaseUser     string
	DatabasePassword string
	DatabaseName     string
	DatabaseHost     string
	DatabasePort     uint16
}

func NewDatabase(DatabaseUser, DatabasePassword, DatabaseName, DatabaseHost string, DatabasePort uint16) *sql.DB {
	dbdata := database{
		DatabaseUser:     DatabaseUser,
		DatabasePassword: DatabasePassword,
		DatabaseName:     DatabaseName,
		DatabaseHost:     DatabaseHost,
		DatabasePort:     DatabasePort,
	}

	db, err := sql.Open("postgres", getDatabaseURL(dbdata))
	if err != nil {
		log.Fatalf("Unable to connect to database: %v\n", err)
	}
	return db
}

func getDatabaseURL(db database) string {
	return fmt.Sprintf("postgres://%s:%s@%s:%d/%s?sslmode=disable", db.DatabaseUser, db.DatabasePassword, db.DatabaseHost, db.DatabasePort, db.DatabaseName)
}
