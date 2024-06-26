package handler

import (
	"encoding/json"
	"log"
	"net/http"
	"trip-cast/constants"
	"trip-cast/internal/api"
	"trip-cast/internal/places"
	"trip-cast/nearbyplaces/usecase"

	"github.com/go-chi/chi/v5"
)

type NearByPlacesHandler struct {
	nearbyUsecase *usecase.NearByPlacesUsecase
}

func NewNearByPlacesHandler(r *chi.Mux, nearbyUsecase *usecase.NearByPlacesUsecase) {
	handler := NearByPlacesHandler{
		nearbyUsecase: nearbyUsecase,
	}
	r.Post("/places", handler.CallAPI)
}

func (h *NearByPlacesHandler) CallAPI(w http.ResponseWriter, r *http.Request) {

	var request places.NearByPlaceRequestBody

	json.NewDecoder(r.Body).Decode(&request)

	categorizedPlaces, err := h.nearbyUsecase.GetNearByPlaces(request.Longitude, request.Latitude)
	if err != nil {
		log.Println(err)
		api.Fail(w, http.StatusInternalServerError, []api.Errors{{
			Code:    http.StatusInternalServerError,
			Message: constants.ErrInternalServerError.Error(),
		}})
		return
	}

	api.Success(w, http.StatusOK, categorizedPlaces)
}
