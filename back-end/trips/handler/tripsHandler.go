package handler

import (
	"encoding/json"
	"log"
	"net/http"
	"trip-cast/constants"
	"trip-cast/domain"
	"trip-cast/internal/api"

	"github.com/go-chi/chi/v5"
)

type tripsHandler struct {
	tripsUsecase domain.TripsUsecase
}

func NewTripsHandler(r *chi.Mux, tripsUsecase domain.TripsUsecase) {
	tripsHandler := &tripsHandler{
		tripsUsecase: tripsUsecase,
	}
	r.Post("/save-trip", tripsHandler.SaveTrip)
}

func (h *tripsHandler) SaveTrip(w http.ResponseWriter, r *http.Request) {

	request := domain.TripsDTO{}

	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		api.Fail(w, http.StatusBadRequest, []api.Errors{{
			Code:    http.StatusBadRequest,
			Message: constants.ErrBadRequest.Error(),
		}})
		return
	}

	tripId, err := h.tripsUsecase.InsertTripDetails(r.Context(), request)
	if err != nil {
		log.Printf("tripsUsecase.InsertTripDetails error : %s", err.Error())
		api.Fail(w, http.StatusInternalServerError, []api.Errors{{
			Code:    http.StatusInternalServerError,
			Message: err.Error(),
		}})
		return
	}
	api.Success(w, http.StatusOK, tripId)
}

// func (h *usersHandler) GetUserDetails(w http.ResponseWriter, r *http.Request) {

// 	var response domain.UsersDTO
// 	mobileNumber := r.URL.Query().Get("phone")
// 	if len(mobileNumber) == 0 {
// 		api.Fail(w, http.StatusBadRequest, []api.Errors{{
// 			Code:    http.StatusBadRequest,
// 			Message: constants.ErrBadRequest.Error(),
// 		}})
// 		return
// 	}

// 	userDetails, err := h.usersUsecase.GetUserDetails(r.Context(), mobileNumber)
// 	if err != nil {
// 		api.Fail(w, http.StatusInternalServerError, []api.Errors{{
// 			Code:    http.StatusInternalServerError,
// 			Message: constants.ErrInternalServerError.Error(),
// 		}})
// 		return
// 	}
// 	if userDetails == nil {
// 		api.Fail(w, http.StatusNotFound, []api.Errors{{
// 			Code:    http.StatusNotFound,
// 			Message: constants.ErrNotFound.Error(),
// 		}})
// 		return
// 	}

// 	response.MapFromDomain(userDetails)

// 	api.Success(w, http.StatusOK, response)
// }
