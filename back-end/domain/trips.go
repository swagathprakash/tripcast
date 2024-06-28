package domain

import (
	"context"
	"encoding/json"
	"time"
)

type Trip struct {
	TripID           int64
	UserID           int64
	Latitude         float64
	Longitude        float64
	StartingLocation string
	Destination      string
	StartDate        time.Time
	EndDate          time.Time
	Companions       string
	Duration         int
	Purpose          string
	Itinerary        json.RawMessage
	Forecast         json.RawMessage
	PackingItems     []string
	SafetyTips       []string
}

type TripsRepository interface {
	InsertTripDetails(ctx context.Context, trip Trip) (uint64, error)
	GetTripDetails(ctx context.Context, params TripRequestParams) ([]Trip, error)
}

type TripsUsecase interface {
	InsertTripDetails(ctx context.Context, data TripsDTO) (uint64, error)
	FetchTrips(ctx context.Context, params TripRequestParams) ([]Trip, error)
}
