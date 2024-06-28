package usecase

import (
	"log"
	"strings"
	"time"
	"trip-cast/constants"
	"trip-cast/internal/location"
	"trip-cast/internal/weather"
)

type WeatherUsecase struct {
	location *location.Location
	weather  *weather.Weather
}

func NewWeatherUsecase(location *location.Location, weather *weather.Weather) *WeatherUsecase {
	return &WeatherUsecase{
		location: location,
		weather:  weather,
	}
}

func (u WeatherUsecase) GetWeatherDetails(weatherParams weather.Params) (*weather.WeatherResponse, error) {

	response, err := u.weather.GetWeatherDetails(weatherParams)
	if err != nil {
		log.Printf("u.weather.GetWeatherDetails with error %s", err.Error())
		return nil, err
	}

	locationResponse, err := u.location.GetLocationDetails(response.Latitude, response.Longitude)
	if err != nil {
		log.Printf("u.location.GetLocationDetails with error %s", err.Error())
		return nil, err
	}

	response.CurrentWeather.WeatherDetail = weather.WMOCodesMap[response.CurrentWeather.WeatherCode]
	response.City = locationResponse.Result[0].City
	response.State = locationResponse.Result[0].State
	response.District = locationResponse.Result[0].District
	if len(strings.Split(locationResponse.Result[0].District, " ")) > 1 {
		response.District = strings.Split(locationResponse.Result[0].District, " ")[0]
	}
	lenHourlyWeather := len(response.Hourly.WeatherCode)
	lenDailyWeather := len(response.Daily.WeatherCode)
	location, err := time.LoadLocation(constants.TimeZoneAsiaKolkata)
	if err != nil {
		log.Printf("load location error:%s", err.Error())
		return nil, err
	}
	currentHour := time.Now().In(location).Hour()
	response.CurrentWeather.ApparentTemperature = response.Hourly.ApparentTemperature[currentHour]
	response.CurrentWeather.RelativeHumidity = response.Hourly.RelativeHumidity2M[currentHour]
	response.CurrentWeather.Rain = response.Hourly.Rain[currentHour]

	for i := 0; i < lenHourlyWeather; i++ {
		hourlyWeatherCode := response.Hourly.WeatherCode[i]
		response.Hourly.WeatherDetail = append(response.Hourly.WeatherDetail, weather.WMOCodesMap[hourlyWeatherCode])

		if i < lenDailyWeather {
			dailyWeatherCode := response.Daily.WeatherCode[i]
			response.Daily.WeatherDetail = append(response.Daily.WeatherDetail, weather.WMOCodesMap[dailyWeatherCode])
		}
	}

	return response, nil
}
