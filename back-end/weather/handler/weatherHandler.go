package handler

import (
	"encoding/json"
	"log"
	"net/http"
	"regexp"
	"trip-cast/constants"
	"trip-cast/internal/api"
	"trip-cast/internal/weather"

	"github.com/go-chi/chi/v5"
)

type weatherHandler struct {
	weather *weather.Weather
}

func NewWeatherHandler(r *chi.Mux, weather *weather.Weather) {
	weatherHandler := weatherHandler{
		weather: weather,
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

	responseString, err := h.weather.GetWeatherDetails(weatherParams)
	if err != nil {
		log.Printf("weather.GetWeatherDetails failed with error : %s", err.Error())
		api.Fail(w, http.StatusInternalServerError, []api.Errors{{
			Code:    http.StatusInternalServerError,
			Message: err.Error(),
		}})
		return
	}

	var response weather.WeatherResponse

	err = json.Unmarshal([]byte(responseString), &response)
	if err != nil {
		log.Println("valid format for start_date/end_date is 'YYYY-MM-DD'")
		api.Fail(w, http.StatusInternalServerError, []api.Errors{{
			Code:    http.StatusInternalServerError,
			Message: err.Error(),
		}})
		return
	}

	api.Success(w, http.StatusOK, response)

}

func isNotValidDateFormat(date string) bool {
	// Regular expression for YYYY-MM-DD format
	dateRegex := `^\d{4}-\d{2}-\d{2}$`
	regex := regexp.MustCompile(dateRegex)
	return !regex.MatchString(date)
}
