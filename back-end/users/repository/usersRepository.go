package repository

import (
	"database/sql"
	"trip-cast/domain"
)

type usersRepository struct {
	db *sql.DB
}

func NewUsersRepository(db *sql.DB) domain.UsersRepository {
	return &usersRepository{
		db: db,
	}
}
