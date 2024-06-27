package usecase

import (
	"strings"
	"time"
	"trip-cast/constants"
	"trip-cast/internal/location"
	"trip-cast/internal/weather"
)

type WeatherUsecase struct {
	location *location.Location
}

func NewWeatherUsecase(location *location.Location) *WeatherUsecase {
	return &WeatherUsecase{
		location: location,
	}
}

func (u WeatherUsecase) AddAdditionalWeatherDetails(response *weather.WeatherResponse) error {

	locationResponse, err := u.location.GetLocationDetails(response.Latitude, response.Longitude)
	if err != nil {
		return err
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
		return err
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


	return nil
}
