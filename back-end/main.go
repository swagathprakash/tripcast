package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	backgroundservice "trip-cast/backgroundservice/usecase"
	chatBothandler "trip-cast/chatbot/handler"
	chatBotusecase "trip-cast/chatbot/usecase"
	"trip-cast/internal/database"
	"trip-cast/internal/env"
	"trip-cast/internal/gemini"
	"trip-cast/internal/location"
	"trip-cast/internal/sms"
	"trip-cast/internal/weather"
	"trip-cast/internal/workerpool"
	"trip-cast/middlewares"
	placesHandler "trip-cast/nearbyplaces/handler"
	placesUsecase "trip-cast/nearbyplaces/usecase"
	notificationHandler "trip-cast/notifications/handler"
	notificationRepository "trip-cast/notifications/repository"
	notificationUsecase "trip-cast/notifications/usecase"
	tripsHandler "trip-cast/trips/handler"
	tripsRepository "trip-cast/trips/repository"
	tripsUsecase "trip-cast/trips/usecase"
	usersHandler "trip-cast/users/handler"
	usersRepository "trip-cast/users/repository"
	usersUsecase "trip-cast/users/usecase"
	weatherHandler "trip-cast/weather/handler"
	weatherUsecase "trip-cast/weather/usecase"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	_ "github.com/lib/pq"
	"github.com/rs/cors"
)

func main() {

	// load env
	env := env.NewEnvConfig()
	ctx := context.Background()

	// setup db
	db := database.NewDatabase(env.DatabaseUser, env.DatabasePassword, env.DatabaseName, env.DatabaseHost, env.DatabasePort)
	defer db.Close()

	// CORS middleware
	corsHandler := cors.New(cors.Options{
		AllowedOrigins:   []string{env.FrontEndURL},
		AllowCredentials: true,
		AllowedMethods:   []string{"GET", "POST"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
	}).Handler

	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(middlewares.SetContentType)
	r.Use(corsHandler)


	// setup services
	smsService := sms.NewSMSService(env.TwillioAccountSID, env.TwillioPhoneNumber, env.TwillioAuthID)
	weatherService := weather.NewWeatherService()
	geminiService := gemini.NewGeminiService(ctx, env.GeminiApiKey, env.GenModel)
	locationService := location.NewLocationService(env.PlacesAPIKey)

	// setup handlers
	ur := usersRepository.NewUsersRepository(db)
	uu := usersUsecase.NewUsersUsecase(ur, smsService)
	usersHandler.NewUsersHandler(r, uu)

	wu := weatherUsecase.NewWeatherUsecase(locationService, weatherService)
	weatherHandler.NewWeatherHandler(r, wu)

	pu := placesUsecase.NewNearbyPlacesUsecase(locationService)
	placesHandler.NewNearByPlacesHandler(r, pu)

	cu := chatBotusecase.NewChatbotUsecase(weatherService)
	chatBothandler.NewChatBotHandler(r, geminiService, cu, wu)

	// notification handler
	nr := notificationRepository.NewNotificationRepository(db)
	nu := notificationUsecase.NewNotificationUsecase(nr)
	notificationHandler.NewNotificationHandler(r, nu)

	tr := tripsRepository.NewTripsRepository(db)
	tu := tripsUsecase.NewTripsUsecase(tr)
	tripsHandler.NewTripsHandler(r, tu)
	bu := backgroundservice.NewBackgroundServiceUsecase(wu, tr, nr)

	woorkerPool := workerpool.NewWorkerPool(env.MaxWorkers)
	woorkerPool.Start()
	woorkerPool.Add(workerpool.Task{
		Func:             bu.BackgroundNotificationProcesses,
		Ctx:              ctx,
		Param:            backgroundservice.BackgroundNotificationServiceParams{WorkerPool: woorkerPool},
		IsResultExpected: false,
	})

	// start server
	log.Println("Server started")
	apiPort := fmt.Sprintf(":%d", env.ApiPort)
	http.ListenAndServe(apiPort, r)
}
