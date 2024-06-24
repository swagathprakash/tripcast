package repository

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"log"
	"strings"
	"trip-cast/domain"
	"trip-cast/internal/utils"
)

type usersRepository struct {
	db *sql.DB
}

func NewUsersRepository(db *sql.DB) domain.UsersRepository {
	return &usersRepository{
		db: db,
	}
}

const (
	queryFetchUserDetails = `
	SELECT
		user_id,
		first_name,
		last_name,
		mobile_number
	FROM
		users
	WHERE
		mobile_number = $1;
	`
	queryInsertToUsers = `
	INSERT INTO users (%s) VALUES %s;
	`
)

const (
	columnFirstName    = "first_name"
	columnLastName     = "last_name"
	columnMobileNumber = "mobile_number"
)

var columsToInsert = []string{
	columnFirstName,
	columnLastName,
	columnMobileNumber,
}

func (r *usersRepository) GetUserDetails(ctx context.Context, mobileNumber string) (*domain.Users, error) {
	var (
		users    domain.Users
		usersDAO domain.UsersDAO
	)
	err := r.db.QueryRowContext(ctx, queryFetchUserDetails, mobileNumber).Scan(
		&usersDAO.UserID,
		&usersDAO.FirstName,
		&usersDAO.LastName,
		&usersDAO.MobileNumber,
	)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, nil
		}
		log.Println("failed to scan with error %w", err)
		return nil, err
	}
	usersDAO.MapToDomain(&users)

	return &users, nil
}

func (r *usersRepository) Register(ctx context.Context, userData domain.UsersDTO) error {

	params := []any{
		userData.FirstName,
		userData.LastName,
		userData.MobileNumber,
	}

	placeHolders := utils.GeneratePlaceHolders(len(params), 1)

	query := fmt.Sprintf(queryInsertToUsers, strings.Join(columsToInsert, ","), placeHolders)
	_, err := r.db.ExecContext(ctx, query, params...)
	if err != nil {
		return err
	}
	return nil
}
