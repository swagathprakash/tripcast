package main

import (
	"database/sql"
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
)

func main() {

	env := env.NewEnvConfig()

	database := database.NewDatabase(env.DatabaseUser, env.DatabasePassword, env.DatabaseName, env.DatabaseHost, env.DatabasePort)
	db, err := sql.Open("postgres", database.GetDatabaseURL())
	if err != nil {
		log.Fatalf("Unable to connect to database: %v\n", err)
	}
	defer db.Close()

	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(middlewares.SetContentType)

	ur := repository.NewUsersRepository(db)
	uu := usecase.NewUsersUsecase(ur)
	handler.NewUsersHandler(r, uu)

	log.Println("Server started")
	http.ListenAndServe(fmt.Sprintf(":%d", env.ApiPort), r)
}
