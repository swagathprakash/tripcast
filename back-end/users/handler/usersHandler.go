package handler

import (
	"net/http"
	"trip-cast/domain"

	"github.com/go-chi/chi/v5"
)

type usersHandler struct {
	usersUsecase domain.UsersUsecase
}

func NewUsersHandler(r *chi.Mux, usersUsecase domain.UsersUsecase) {
	usersHandler := &usersHandler{
		usersUsecase: usersUsecase,
	}
	r.Get("/login", usersHandler.Login)
	r.Post("/register", usersHandler.Register)

}

func (h usersHandler) Login(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Logged in"))
}

func (h usersHandler) Register(w http.ResponseWriter, r *http.Request) {

}
