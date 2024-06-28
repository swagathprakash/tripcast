package handler

import (
	"encoding/json"
	"log"
	"net/http"
	"time"
	"trip-cast/constants"
	"trip-cast/domain"
	"trip-cast/internal/api"
	"trip-cast/internal/gemini"

	"github.com/go-chi/chi/v5"
)

type tripsHandler struct {
	tripsUsecase domain.TripsUsecase
}

func NewTripsHandler(r *chi.Mux, tripsUsecase domain.TripsUsecase) {
	tripsHandler := &tripsHandler{
		tripsUsecase: tripsUsecase,
	}
	r.Post("/trip", tripsHandler.SaveTrip)
	r.Get("/trip", tripsHandler.FetchTrips)
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

func (h *tripsHandler) FetchTrips(w http.ResponseWriter, r *http.Request) {

	responses := domain.TripsResponse{}
	params := domain.TripRequestParams{}

	err := json.NewDecoder(r.Body).Decode(&params)
	if err != nil {
		api.Fail(w, http.StatusBadRequest, []api.Errors{{
			Code:    http.StatusBadRequest,
			Message: constants.ErrBadRequest.Error(),
		}})
		return
	}

	trips, err := h.tripsUsecase.FetchTrips(r.Context(), params)
	if err != nil {
		api.Fail(w, http.StatusInternalServerError, []api.Errors{{
			Code:    http.StatusInternalServerError,
			Message: constants.ErrInternalServerError.Error(),
		}})
		return
	}
	if trips == nil {
		api.Fail(w, http.StatusNotFound, []api.Errors{{
			Code:    http.StatusNotFound,
			Message: constants.ErrTripsNotFound.Error(),
		}})
		return
	}

	for _, trip := range trips {
		response := gemini.Response{}
		trip.MapFromDomain(&response)

		if params.TripID != 0 {
			responses.Trip = &response
			break
		}
		// seperate finished and upcomming trips
		if trip.EndDate.After(time.Now()) {
			responses.Finished = append(responses.Finished, response)
			continue
		}
		responses.Upcoming = append(responses.Upcoming, response)
	}

	api.Success(w, http.StatusOK, responses)
}
