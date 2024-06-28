package repository

import (
	"context"
	"errors"
	"fmt"
	"log"
	"strings"
	"trip-cast/domain"
	"trip-cast/internal/utils"

	"github.com/jackc/pgx/v4"
	"github.com/jackc/pgx/v4/pgxpool"
	"github.com/jackc/pgx/v5/pgtype"
)

type usersRepository struct {
	db *pgxpool.Pool
}

func NewUsersRepository(db *pgxpool.Pool) domain.UsersRepository {
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
	INSERT INTO users (%s) VALUES %s RETURNING user_id;
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
	err := r.db.QueryRow(ctx, queryFetchUserDetails, mobileNumber).Scan(
		&usersDAO.UserID,
		&usersDAO.FirstName,
		&usersDAO.LastName,
		&usersDAO.MobileNumber,
	)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, nil
		}
		log.Println("failed to scan with error %w", err)
		return nil, err
	}
	usersDAO.MapToDomain(&users)

	return &users, nil
}

func (r *usersRepository) Register(ctx context.Context, userData domain.UsersDTO) (uint64, error) {
	var userID pgtype.Int8
	params := []any{
		userData.FirstName,
		userData.LastName,
		userData.MobileNumber,
	}

	placeHolders := utils.GeneratePlaceHolders(len(params), 1)

	query := fmt.Sprintf(queryInsertToUsers, strings.Join(columsToInsert, ","), placeHolders)
	err := r.db.QueryRow(ctx, query, params...).Scan(&userID)
	if err != nil {
		return 0, err
	}
	return uint64(userID.Int64), nil
}
