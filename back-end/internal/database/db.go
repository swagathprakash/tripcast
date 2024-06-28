package database

import (
	"context"
	"fmt"
	"log"

	"github.com/jackc/pgx/v4/pgxpool"
)

type database struct {
	DatabaseUser     string
	DatabasePassword string
	DatabaseName     string
	DatabaseHost     string
	DatabasePort     uint16
}

func NewDatabase(DatabaseUser, DatabasePassword, DatabaseName, DatabaseHost string, DatabasePort uint16) *pgxpool.Pool {
	dbdata := database{
		DatabaseUser:     DatabaseUser,
		DatabasePassword: DatabasePassword,
		DatabaseName:     DatabaseName,
		DatabaseHost:     DatabaseHost,
		DatabasePort:     DatabasePort,
	}
	pool, err := pgxpool.Connect(context.Background(), getDatabaseURL(dbdata))
	if err != nil {
		log.Fatalf("Unable to connect to database: %v\n", err)
	}
	return pool
}

func getDatabaseURL(db database) string {
	return fmt.Sprintf("postgres://%s:%s@%s:%d/%s?sslmode=disable", db.DatabaseUser, db.DatabasePassword, db.DatabaseHost, db.DatabasePort, db.DatabaseName)
}
