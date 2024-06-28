package domain

import (
	"context"
	"encoding/json"
	"time"
)

type Trip struct {
	UserID           int64
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
	Saved            bool
}

type TripsRepository interface {
	InsertTripDetails(ctx context.Context, trip Trip) (uint64, error)
}

type TripsUsecase interface {
	InsertTripDetails(ctx context.Context, data TripsDTO) (uint64, error)
}
