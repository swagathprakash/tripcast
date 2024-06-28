package weather

import (
	"encoding/json"
	"log"
	"trip-cast/constants"

	"github.com/innotechdevops/openmeteo"
)

type Weather struct {
	openMeteo openmeteo.OpenMeteo
}

func NewWeatherService() *Weather {
	return &Weather{
		openMeteo: openmeteo.New(),
	}
}

func (weather Weather) GetWeatherDetails(params Params) (*WeatherResponse, error) {

	weatherParams := getWeatherParams(params)

	resp, err := weather.openMeteo.Execute(weatherParams)
	if err != nil {
		return nil, err
	}

	var response WeatherResponse

	err = json.Unmarshal([]byte(resp), &response)
	if err != nil {
		log.Printf("unmarshal error in weather.go :%s\n", err.Error())
		return nil, err
	}

	return &response, nil
}

func getWeatherParams(params Params) openmeteo.Parameter {

	weatherParams := openmeteo.Parameter{}

	weatherParams.Latitude = openmeteo.Float32(float32(params.Latitude))
	weatherParams.Longitude = openmeteo.Float32(float32(params.Longitude))
	weatherParams.StartDate = &params.StartDate
	weatherParams.EndDate = &params.EndDate
	weatherParams.Timezone = &constants.TimeZoneAsiaKolkata
	weatherParams.ForecastDays = &params.ForeCastDays

	weatherParams.CurrentWeather = &constants.ValueTrue
	weatherParams.Hourly = &requiredHourlyData
	weatherParams.Daily = &requiredDailyData

	return weatherParams
}
