package domain

import "trip-cast/internal/gemini"

type TripsDTO struct {
	UserID      int64           `json:"user_id"`
	TripDetails gemini.Response `json:"trip_details"`
}
