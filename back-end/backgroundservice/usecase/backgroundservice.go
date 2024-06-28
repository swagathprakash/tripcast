package usecase

import (
	"context"
	"encoding/json"
	"log"
	"time"
	"trip-cast/constants"
	"trip-cast/domain"

	// "trip-cast/internal/weather"
	"trip-cast/internal/gemini"
	"trip-cast/internal/weather"
	"trip-cast/internal/workerpool"
	weatherUsecase "trip-cast/weather/usecase"
)

type backGroundServiceUsecase struct {
	weatherUsecase         *weatherUsecase.WeatherUsecase
	tripsRepository        domain.TripsRepository
	notificationRepository domain.NotificationRepository
}

func NewBackgroundServiceUsecase(weatherUsecase *weatherUsecase.WeatherUsecase, tripsRepository domain.TripsRepository, notificationRepository domain.NotificationRepository) domain.BackgroundNotificationUsecase {
	return &backGroundServiceUsecase{
		weatherUsecase:         weatherUsecase,
		tripsRepository:        tripsRepository,
		notificationRepository: notificationRepository,
	}
}

func (u *backGroundServiceUsecase) BackgroundNotificationProcesses(params any) (any, error) {
	workerPool, ok := params.(BackgroundNotificationServiceParams)
	if !ok {
		return nil, constants.ErrBackgroundNotificationParams
	}
	ctx := context.Background()
	ticker := time.NewTicker(15 * time.Second)

	offset := 0

	for range ticker.C {

		for {
			trips, hasMoreRows, err := u.tripsRepository.GetTripsInBatch(ctx, constants.ChunkSize, offset)
			if err != nil {
				log.Println("failed to get trips batches")
				return nil, err
			}
			params := domain.CreateNotificationParams{
				Trips: trips,
				Ctx:   ctx,
			}
			workerPool.WorkerPool.Add(workerpool.Task{
				Func:  u.createNotification,
				Param: params,
			})
			if !hasMoreRows {
				break
			}
		}
	}

	return nil, nil
}

func (u *backGroundServiceUsecase) createNotification(val any) (any, error) {

	notificationParams, ok := val.(domain.CreateNotificationParams)
	if !ok {
		log.Println("failed to extract []Trips from the interface")
		return nil, constants.ErrBackgroundNotificationParams
	}
	trips := notificationParams.Trips
	for _, trip := range trips {
		var forcast gemini.Forecast
		err := json.Unmarshal(trip.Forecast, &forcast)
		if err != nil {
			log.Printf("failed to unmarshal the forcast: %s with error %s\n", string(trip.Forecast), err.Error())
			return nil, err
		}
		forcastTimeAndWeatherCode := getForcastTimeAndWeatherCode(forcast)
		params := weather.Params{
			Latitude:  trip.Latitude,
			Longitude: trip.Longitude,
			StartDate: trip.StartDate.Format(constants.DateFormatForWeatherAPI),
			EndDate:   trip.EndDate.Format(constants.DateFormatForWeatherAPI),
		}
		weather, err := u.weatherUsecase.GetWeatherDetails(params)
		if err != nil {
			log.Printf("failed to call weather API with error %s for request %+v\n", err.Error(), params)
		}

		for index, time := range weather.Hourly.Time {
			weatherCode, ok := forcastTimeAndWeatherCode[time]
			if ok {
				if weatherCode != weather.Hourly.WeatherCode[index] {
					// sentNotification
					err = u.sendNotification(notificationParams.Ctx, trip)
					if err != nil {
						log.Println("failed to create and sent notification with error", err)
						return nil, err
					}
					break
				}
			}
		}
	}

	return nil, nil
}

func getForcastTimeAndWeatherCode(forcast gemini.Forecast) map[string]int {
	forcastTimeAndWeatherCode := make(map[string]int)
	for _, f := range forcast {
		forcastTimeAndWeatherCode[f.Time] = f.WeatherCode
	}
	return forcastTimeAndWeatherCode
}

func (u *backGroundServiceUsecase) sendNotification(ctx context.Context, trip domain.Trip) error {
	notification := domain.Notifications{
		Content: constants.NotificationContent,
		TripID:  uint64(trip.TripID),
		UserID:  uint64(trip.UserID),
	}
	err := u.notificationRepository.Insert(ctx, notification)
	if err != nil {
		log.Println("failed to store notification with error", err)
		return err
	}
	return nil
}
