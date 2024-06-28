package domain

import (
	"encoding/json"
	"trip-cast/constants"
	"trip-cast/internal/gemini"
)

type TripsDTO struct {
	UserID      int64           `json:"userId"`
	TripDetails gemini.Response `json:"tripDetails"`
}

type TripRequestParams struct {
	UserID int64 `json:"user_id"`
	TripID int64 `json:"trip_id"`
}

type TripsResponse struct {
	Trip     *TripsDetailsResponse  `json:"trip_datails,omitempty"`
	Upcoming []TripsDetailsResponse `json:"upcoming,omitempty"`
	Finished []TripsDetailsResponse `json:"finished,omitempty"`
}

type TripsDetailsResponse struct {
	TripID           uint64          `json:"trip_id"`
	StartingLocation string          `json:"starting_location"`
	Latitude         float64         `json:"latitude"`
	Longitude        float64         `json:"longitude"`
	Destination      string          `json:"destination"`
	StartDate        string          `json:"start_date"`
	EndDate          string          `json:"end_date"`
	Companions       string          `json:"companions"`
	Duration         int             `json:"duration"`
	Purpose          string          `json:"purpose"`
	Itinerary        json.RawMessage `json:"itinerary"`
	Forecast         json.RawMessage `json:"forecast"`
	PackingItems     []string        `json:"packingRecommendations"`
	SafetyTips       []string        `json:"safetyTips"`
}

func (domain Trip) MapFromDomain(response *TripsDetailsResponse) {
	response.StartingLocation = domain.StartingLocation
	response.Destination = domain.Destination
	response.StartDate = domain.StartDate.Format(constants.Datelayout)
	response.EndDate = domain.EndDate.Format(constants.Datelayout)
	response.Companions = domain.Companions
	response.Duration = domain.Duration
	response.Purpose = domain.Purpose
	response.PackingItems = domain.PackingItems
	response.SafetyTips = domain.SafetyTips
	response.Latitude = domain.Latitude
	response.Longitude = domain.Longitude
	response.Itinerary = domain.Itinerary
	response.Forecast = domain.Forecast
	response.TripID = uint64(domain.TripID)
}
