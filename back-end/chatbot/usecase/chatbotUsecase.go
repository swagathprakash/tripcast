package usecase

import (
	"encoding/json"
	"trip-cast/internal/gemini"
	"trip-cast/internal/weather"
	"trip-cast/weather/usecase"
)

type ChatBotUsecase struct {
	weather        *weather.Weather
	weatherUsecase *usecase.WeatherUsecase
}

func NewUsersUsecase(weather *weather.Weather, weatherUsecase *usecase.WeatherUsecase) *ChatBotUsecase {
	return &ChatBotUsecase{
		weather:        weather,
		weatherUsecase: weatherUsecase,
	}
}

func (u ChatBotUsecase) ConvertToPrompt(request gemini.RequestParams) (string, error) {

	weatherParams := weather.Params{
		Latitude:  request.Latitude,
		Longitude: request.Longitude,
		StartDate: request.StartDate,
		EndDate:   request.EndDate,
	}
	responseString, err := u.weather.GetWeatherDetails(weatherParams)
	if err != nil {
		return "", err
	}

	var weatherResponse weather.WeatherResponse
	err = json.Unmarshal([]byte(responseString), &weatherResponse)
	if err != nil {
		return "", err
	}

	u.weatherUsecase.AddAdditionalWeatherDetails(&weatherResponse)

	for i, v := range weatherResponse.Daily.WeatherDetail {
		request.Forecast = append(request.Forecast,
			gemini.RequestWeatherInfo{
				Date:    weatherResponse.Daily.Time[i],
				Weather: v,
			},
		)
	}

	jsonData, err := json.Marshal(request)
	if err != nil {
		return "", err
	}

	prompt := string(jsonData)

	return prompt, nil
}
