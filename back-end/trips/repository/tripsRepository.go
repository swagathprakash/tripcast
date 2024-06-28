package repository

import (
	"context"
	"fmt"
	"log"
	"strings"
	"trip-cast/domain"
	"trip-cast/internal/utils"

	"github.com/jackc/pgx/v4/pgxpool"
	"github.com/jackc/pgx/v5/pgtype"
)

type tripsRepository struct {
	db *pgxpool.Pool
}

func NewTripsRepository(db *pgxpool.Pool) domain.TripsRepository {
	return &tripsRepository{
		db: db,
	}
}

const (
	queryFetchTripDetails = `
	SELECT *
	FROM
		trips
	`
	queryInsertToTrips = `
	INSERT INTO trips (%s) VALUES %s RETURNING trip_id;
	`
)

const (
	columnUserID        = "user_id"
	columnStartLocation = "start_location"
	columnDestination   = "destination"
	columnStartDate     = "start_date"
	columnEndDate       = "end_date"
	columnCompanions    = "companions"
	columnPurpose       = "purpose"
	columnItenerary     = "itinerary"
	columnForecast      = "forecast"
	columnPackngItems   = "packing_items"
	columnSafetyTips    = "safety_tips"
)

var columsToInsert = []string{
	columnUserID,
	columnStartLocation,
	columnDestination,
	columnStartDate,
	columnEndDate,
	columnCompanions,
	columnPurpose,
	columnItenerary,
	columnForecast,
	columnPackngItems,
	columnSafetyTips,
}

// func (r *tripsRepository) GetTripDetails(ctx context.Context, tripID int64) (*domain.Users, error) {
// 	var (
// 		trips    domain.Trip
// 		usersDAO domain.UsersDAO
// 	)
// 	err := r.db.QueryRowContext(ctx, queryFetchUserDetails, tripID).Scan(
// 		&usersDAO.UserID,
// 		&usersDAO.FirstName,
// 		&usersDAO.LastName,
// 		&usersDAO.MobileNumber,
// 	)
// 	if err != nil {
// 		if errors.Is(err, sql.ErrNoRows) {
// 			return nil, nil
// 		}
// 		log.Println("failed to scan with error %w", err)
// 		return nil, err
// 	}
// 	usersDAO.MapToDomain(&users)

// 	return &users, nil
// }

func (r *tripsRepository) InsertTripDetails(ctx context.Context, trip domain.Trip) (uint64, error) {
	var tripID pgtype.Int8
	params := []any{
		trip.UserID,
		trip.StartingLocation,
		trip.Destination,
		trip.StartDate,
		trip.EndDate,
		trip.Companions,
		trip.Purpose,
		trip.Itinerary,
		trip.Forecast,

		trip.PackingItems,
		trip.SafetyTips,
	}

	placeHolders := utils.GeneratePlaceHolders(len(params), 1)

	query := fmt.Sprintf(queryInsertToTrips, strings.Join(columsToInsert, ","), placeHolders)
	err := r.db.QueryRow(ctx, query, params...).Scan(&tripID)
	if err != nil {
		log.Printf("repo.Insert trip deatils failed with error:%s", err.Error())
		return 0, err
	}
	return uint64(tripID.Int64), nil
}
