package handler

import (
	"encoding/json"
	"log"
	"net/http"
	"regexp"
	"trip-cast/constants"
	"trip-cast/internal/api"
	"trip-cast/internal/weather"
	"trip-cast/weather/usecase"

	"github.com/go-chi/chi/v5"
)

type weatherHandler struct {
	usecase usecase.WeatherUsecase
}

func NewWeatherHandler(r *chi.Mux, usecase *usecase.WeatherUsecase) {
	weatherHandler := weatherHandler{
		usecase: *usecase,
	}
	r.Post("/get-weather", weatherHandler.GetWeather)
}

func (h weatherHandler) GetWeather(w http.ResponseWriter, r *http.Request) {

	var request weather.RequestParams
	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		log.Println("failed to decode request")
		api.Fail(w, http.StatusBadRequest, []api.Errors{{
			Code:    http.StatusBadRequest,
			Message: constants.ErrBadRequest.Error(),
		}})
		return
	}

	if request.Latitude == 0 || request.Longitude == 0 {
		log.Println("latitude/longitude is required")
		api.Fail(w, http.StatusBadRequest, []api.Errors{{
			Code:    http.StatusBadRequest,
			Message: constants.ErrLatitudeLongitudeRequired.Error(),
		}})
		return
	}

	if isNotValidDateFormat(request.StartDate) || isNotValidDateFormat(request.EndDate) {
		log.Println("valid format for start_date/end_date is 'YYYY-MM-DD'")
		api.Fail(w, http.StatusBadRequest, []api.Errors{{
			Code:    http.StatusBadRequest,
			Message: constants.ErrValidDateFormat.Error(),
		}})
		return
	}

	weatherParams := weather.Params{
		Latitude:  request.Latitude,
		Longitude: request.Longitude,
		StartDate: request.StartDate,
		EndDate:   request.EndDate,
	}

	if request.ForeCastDays != 0 {
		weatherParams.ForeCastDays = request.ForeCastDays
		weatherParams.StartDate = ""
		weatherParams.EndDate = ""
	}

	weatherDetails, err := h.usecase.GetWeatherDetails(weatherParams)
	if err != nil {
		log.Printf("usecase.GetWeatherDetails failed with error: %s", err.Error())
		api.Fail(w, http.StatusInternalServerError, []api.Errors{{
			Code:    http.StatusInternalServerError,
			Message: err.Error(),
		}})
		return
	}

	api.Success(w, http.StatusOK, weatherDetails)

}

func isNotValidDateFormat(date string) bool {
	// Regular expression for YYYY-MM-DD format
	dateRegex := `^\d{4}-\d{2}-\d{2}$`
	regex := regexp.MustCompile(dateRegex)
	return !regex.MatchString(date)
}
