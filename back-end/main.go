package main

import (
	"fmt"
	"log"
	"net/http"
	"trip-cast/internal/database"
	"trip-cast/internal/env"
	"trip-cast/internal/sms"
	"trip-cast/internal/weather"
	"trip-cast/middlewares"
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
	sms := sms.NewSMSService(env.TwillioAccountSID, env.TwillioPhoneNumber, env.TwillioAuthID)
	w := weather.NewWeatherService()

	// setup domains
	ur := usersRepository.NewUsersRepository(db)
	uu := usersUsecase.NewUsersUsecase(ur, sms)
	usersHandler.NewUsersHandler(r, uu)

	weatherHandler.NewWeatherHandler(r, w)

	// start server
	log.Println("Server started")
	apiPort := fmt.Sprintf(":%d", env.ApiPort)
	http.ListenAndServe(apiPort, r)
}
