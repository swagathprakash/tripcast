package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	chatBothandler "trip-cast/chatbot/handler"
	"trip-cast/internal/database"
	"trip-cast/internal/env"
	"trip-cast/internal/gemini"
	"trip-cast/internal/location"
	"trip-cast/internal/sms"
	"trip-cast/internal/weather"
	"trip-cast/middlewares"
	placesHandler "trip-cast/nearbyplaces/handler"
	placesUsecase "trip-cast/nearbyplaces/usecase"
	usersHandler "trip-cast/users/handler"
	usersRepository "trip-cast/users/repository"
	usersUsecase "trip-cast/users/usecase"
	weatherHandler "trip-cast/weather/handler"

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

	weatherHandler.NewWeatherHandler(r, weatherService, locationService)

	pu := placesUsecase.NewNearbyPlacesUsecase(locationService)
	placesHandler.NewNearByPlacesHandler(r, pu)

	chatBothandler.NewChatBotHandler(r, geminiService)

	// start server
	log.Println("Server started")
	apiPort := fmt.Sprintf(":%d", env.ApiPort)
	http.ListenAndServe(apiPort, r)
}
