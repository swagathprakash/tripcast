package main

import (
	"database/sql"
	"log"
	"net/http"
	"trip-cast/config"
	"trip-cast/users/handler"
	"trip-cast/users/repository"
	"trip-cast/users/usecase"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	_ "github.com/lib/pq"
)

func main() {
	cfg := config.NewConfig()
	db, err := sql.Open("postgres", cfg.GetDatabaseURL())
	if err != nil {
		log.Fatalf("Unable to connect to database: %v\n", err)
	}
	defer db.Close()

	r := chi.NewRouter()
	r.Use(middleware.Logger)

	ur := repository.NewUsersRepository(db)
	uu := usecase.NewUsersUsecase(ur)
	handler.NewUsersHandler(r, uu)

	log.Println("Started server on port 4003...")
	http.ListenAndServe(":4003", r)
}
