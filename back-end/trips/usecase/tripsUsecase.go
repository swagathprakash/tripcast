package usecase

import (
	"context"
	"encoding/json"
	"log"
	"time"
	"trip-cast/constants"
	"trip-cast/domain"
)

type tripsUsecase struct {
	tripsRepo domain.TripsRepository
}

func NewTripsUsecase(tripsRepo domain.TripsRepository) domain.TripsUsecase {
	return &tripsUsecase{
		tripsRepo: tripsRepo,
	}
}

func (u *tripsUsecase) FetchTrips(ctx context.Context, params domain.TripRequestParams) ([]domain.Trip, error) {
	trips, err := u.tripsRepo.GetTripDetails(ctx, params)
	if err != nil {
		log.Println("failed to get trip details with error %w", err)
		return nil, err
	}
	return trips, nil
}

func (u *tripsUsecase) InsertTripDetails(ctx context.Context, tripData domain.TripsDTO) (uint64, error) {

	data := tripData.TripDetails

	trip := domain.Trip{}
	ParsedStartDate, err := time.Parse(constants.Datelayout, data.StartDate)
	if err != nil {
		log.Printf("parsing error:%s", err.Error())
		return 0, err
	}
	ParsedEndDate, err := time.Parse(constants.Datelayout, data.EndDate)
	if err != nil {
		log.Printf("parsing error:%s", err.Error())
		return 0, err
	}
	itenerary, err := json.Marshal(data.Itinerary)
	if err != nil {
		log.Printf("marshal error:%s", err.Error())
		return 0, err
	}
	forecast, err := json.Marshal(data.Forecast)
	if err != nil {
		log.Printf("marshal error:%s", err.Error())
		return 0, err
	}

	trip.UserID = tripData.UserID
	trip.StartingLocation = data.StartingLocation
	trip.Destination = data.Destination
	trip.StartDate = ParsedStartDate
	trip.EndDate = ParsedEndDate
	trip.Companions = data.Companions
	trip.Duration = data.Duration
	trip.Purpose = data.Purpose
	trip.PackingItems = data.PackingItems
	trip.SafetyTips = data.SafetyTips
	trip.Itinerary = itenerary
	trip.Forecast = forecast

	tripID, err := u.tripsRepo.InsertTripDetails(ctx, trip)
	if err != nil {
		log.Println("failed to store trip data with error", err)
		return 0, err
	}
	return tripID, nil
}
