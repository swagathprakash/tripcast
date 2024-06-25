package main

import (
	"fmt"
	"log"
	"net/http"
	"trip-cast/internal/database"
	"trip-cast/internal/env"
	"trip-cast/middlewares"
	"trip-cast/users/handler"
	"trip-cast/users/repository"
	"trip-cast/users/usecase"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	_ "github.com/lib/pq"
	"github.com/rs/cors"
)

func main() {

	env := env.NewEnvConfig()

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

	// setup domains
	ur := repository.NewUsersRepository(db)
	uu := usecase.NewUsersUsecase(ur)
	handler.NewUsersHandler(r, uu)

	// start server
	log.Println("Server started")
	http.ListenAndServe(fmt.Sprintf(":%d", env.ApiPort), r)
}
