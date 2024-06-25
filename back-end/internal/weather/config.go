package weather

import "github.com/innotechdevops/openmeteo"

type Params struct {
	Latitude     float32
	Longitude    float32
	StartDate    string
	EndDate      string
	ForeCastDays int
}

type RequestParams struct {
	Latitude     float32 `json:"latitude"`
	Longitude    float32 `json:"longitude"`
	StartDate    string  `json:"start_date"`
	EndDate      string  `json:"end_date"`
	ForeCastDays int     `json:"forecast_days"`
}

// required hourly weather data
var requiredHourlyData = []string{
	openmeteo.HourlyTemperature2m,
	openmeteo.HourlyRelativeHumidity2m,
	openmeteo.HourlyApparentTemperature,
	openmeteo.HourlyApparentTemperature,
	openmeteo.HourlyWeatherCode,
	openmeteo.HourlyRain,
}

// required daily weather data
var requiredDailyData = []string{
	openmeteo.DailyTemperature2mMax,
	openmeteo.DailyTemperature2mMin,
	openmeteo.DailyApparentTemperatureMax,
	openmeteo.DailyApparentTemperatureMin,
	openmeteo.DailyUvIndexMax,
	openmeteo.DailyWeatherCode,
	openmeteo.DailyRainSum,
}

type WeatherResponse struct {
	Latitude       float64 `json:"latitude"`
	Longitude      float64 `json:"longitude"`
	CurrentWeather struct {
		Time        string  `json:"time"`
		Temperature float64 `json:"temperature"`
		WindSpeed   float64 `json:"windspeed"`
		IsDay       int     `json:"is_day"`
		WeatherCode int     `json:"weathercode"`
	} `json:"current_weather"`
	Hourly struct {
		Time                []string  `json:"time"`
		Temperature2M       []float64 `json:"temperature_2m"`
		RelativeHumidity2M  []int     `json:"relativehumidity_2m"`
		ApparentTemperature []float64 `json:"apparent_temperature"`
		WeatherCode         []int     `json:"weathercode"`
		Rain                []float64 `json:"rain"`
	} `json:"hourly"`
	Daily struct {
		Time                   []string  `json:"time"`
		Temperature2MMax       []float64 `json:"temperature_2m_max"`
		Temperature2MMin       []float64 `json:"temperature_2m_min"`
		ApparentTemperatureMax []float64 `json:"apparent_temperature_max"`
		ApparentTemperatureMin []float64 `json:"apparent_temperature_min"`
		UVIndexMax             []float64 `json:"uv_index_max"`
		WeatherCode            []int     `json:"weathercode"`
		RainSum                []float64 `json:"rain_sum"`
	} `json:"daily"`
}
