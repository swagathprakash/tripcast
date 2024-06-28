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
	SELECT
		trip_id,
		user_id,
		start_location,
		destination,
		start_date,
		end_date,
		companions,
		purpose,
		itinerary,
		forecast,
		packing_items,
		safety_tips,
		latitude,
		longitude
	FROM
		trips
	%s
	`
	queryInsertToTrips = `
	INSERT INTO trips (%s) VALUES %s RETURNING trip_id;
	`

	queryFetchTripBatches = `
	SELECT
		trip_id,
		user_id,
		start_location,
		destination,
		start_date,
		end_date,
		companions,
		purpose,
		itinerary,
		forecast,
		packing_items,
		safety_tips,
		latitude,
		longitude
	FROM
		trips
	ORDER BY
		user_id
	LIMIT $1
	OFFSET $2;
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
	columnLatitude      = "latitude"
	columnLongitude     = "longitude"
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
	columnLatitude,
	columnLongitude,
}

func (r *tripsRepository) GetTripDetails(ctx context.Context, params domain.TripRequestParams) ([]domain.Trip, error) {

	var (
		tripDao    domain.TripsDAO
		trip       domain.Trip
		trips      []domain.Trip
		wherePrams interface{}
		whereQuery []string
		args       int
	)

	if params.TripID != 0 {
		whereQuery = append(whereQuery, fmt.Sprintf("WHERE trip_id = $%d", args+1))
		wherePrams = params.TripID
		args++
	}
	if params.UserID != 0 {
		whereQuery = append(whereQuery, fmt.Sprintf("WHERE user_id = $%d", args+1))
		wherePrams = params.UserID
		args++
	}

	query := fmt.Sprintf(queryFetchTripDetails, whereQuery[0])
	rows, err := r.db.Query(ctx, query, wherePrams)
	if err != nil {
		log.Printf("error while listing trips:%s", err.Error())
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		err := rows.Scan(
			&tripDao.TripID,
			&tripDao.UserID,
			&tripDao.StartingLocation,
			&tripDao.Destination,
			&tripDao.StartDate,
			&tripDao.EndDate,
			&tripDao.Companions,
			&tripDao.Purpose,
			&tripDao.Itinerary,
			&tripDao.Forecast,
			&tripDao.PackingItems,
			&tripDao.SafetyTips,
			&tripDao.Latitude,
			&tripDao.Longitude,
		)
		if err != nil {
			log.Printf("error while scaning rows in listing trips:%s", err.Error())
			return nil, err
		}
		tripDao.MapToDomain(&trip)
		trips = append(trips, trip)
	}

	return trips, nil
}

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
		trip.Latitude,
		trip.Longitude,
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

func (r *tripsRepository) GetTripsInBatch(ctx context.Context, limit, offset int) ([]domain.Trip, bool, error) {

	var (
		trip        domain.Trip
		trips       []domain.Trip
		tripsDAO    domain.TripsDAO
		hasMoreRows bool
	)
	rows, err := r.db.Query(ctx, queryFetchTripBatches, limit+1, offset)
	if err != nil {
		return nil, hasMoreRows, err
	}
	defer rows.Close()

	for rows.Next() {
		err = rows.Scan(
			&tripsDAO.TripID,
			&tripsDAO.UserID,
			&tripsDAO.StartingLocation,
			&tripsDAO.Destination,
			&tripsDAO.StartDate,
			&tripsDAO.EndDate,
			&tripsDAO.Companions,
			&tripsDAO.Purpose,
			&tripsDAO.Itinerary,
			&tripsDAO.Forecast,
			&tripsDAO.PackingItems,
			&tripsDAO.SafetyTips,
			&tripsDAO.Latitude,
			&tripsDAO.Longitude,
		)
		if err != nil {
			return nil, hasMoreRows, err
		}
		tripsDAO.MapToDomain(&trip)
		trips = append(trips, trip)
	}
	if rows.Err() != nil {
		return nil, hasMoreRows, rows.Err()
	}

	if len(trips) > limit {
		hasMoreRows = true
		trips = trips[:len(trips)-1]
	}

	return trips, hasMoreRows, nil
}
