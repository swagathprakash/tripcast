package domain

import (
	"encoding/json"

	"github.com/jackc/pgx/v5/pgtype"
)

type TripsDAO struct {
	TripID           pgtype.Int8
	UserID           pgtype.Int8
	StartingLocation pgtype.Text
	Latitude         pgtype.Float8
	Longitude        pgtype.Float8
	Destination      pgtype.Text
	StartDate        pgtype.Date
	EndDate          pgtype.Date
	Companions       pgtype.Text
	Duration         pgtype.Int8
	Purpose          pgtype.Text
	Itinerary        pgtype.Text
	Forecast         pgtype.Text
	PackingItems     []string
	SafetyTips       []string
}

func (dao TripsDAO) MapToDomain(domain *Trip) {
	domain.TripID = dao.TripID.Int64
	domain.UserID = dao.UserID.Int64
	domain.StartingLocation = dao.StartingLocation.String
	domain.Destination = dao.Destination.String
	domain.StartDate = dao.StartDate.Time
	domain.EndDate = dao.EndDate.Time
	domain.Companions = dao.Companions.String
	domain.Duration = int(dao.Duration.Int64)
	domain.Purpose = dao.Purpose.String
	domain.Itinerary = json.RawMessage(dao.Itinerary.String)
	domain.Forecast = json.RawMessage(dao.Forecast.String)
	domain.PackingItems = dao.PackingItems
	domain.SafetyTips = dao.SafetyTips
	domain.Latitude = dao.Latitude.Float64
	domain.Longitude = dao.Longitude.Float64
}
