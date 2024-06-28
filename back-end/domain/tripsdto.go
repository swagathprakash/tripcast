package domain

import (
	"trip-cast/constants"
	"trip-cast/internal/gemini"
)

type TripsDTO struct {
	UserID      int64           `json:"user_id"`
	TripDetails gemini.Response `json:"trip_details"`
}

type TripRequestParams struct {
	UserID int64 `json:"user_id"`
	TripID int64 `json:"trip_id"`
}

type TripsResponse struct {
	Trip     *gemini.Response   `json:"trip_datails,omitempty"`
	Upcoming []gemini.Response `json:"upcoming,omitempty"`
	Finished []gemini.Response `json:"finished,omitempty"`
}

func (domain Trip) MapFromDomain(response *gemini.Response) {
	response.StartingLocation = domain.StartingLocation
	response.Destination = domain.Destination
	response.StartDate = domain.StartDate.Format(constants.Datelayout)
	response.EndDate = domain.EndDate.Format(constants.Datelayout)
	response.Companions = domain.Companions
	response.Duration = domain.Duration
	response.Purpose = domain.Purpose
	response.PackingItems = domain.PackingItems
	response.SafetyTips = domain.SafetyTips
}
