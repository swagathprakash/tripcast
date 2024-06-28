package usecase

import (
	"encoding/json"
	"log"
	"trip-cast/internal/gemini"
	"trip-cast/internal/weather"
)

type ChatBotUsecase struct {
	weather *weather.Weather
}

func NewChatbotUsecase(weather *weather.Weather) *ChatBotUsecase {
	return &ChatBotUsecase{
		weather: weather,
	}
}

func (u ChatBotUsecase) BuildPrompt(weatherResponse *weather.WeatherResponse, request *gemini.RequestParams) (string, error) {

	// add weather details for the trip days
	for i, v := range weatherResponse.Hourly.Time {
		request.Forecast = append(request.Forecast,
			gemini.RequestWeatherInfo{
				Time:        v,
				Weather:     weatherResponse.Hourly.WeatherDetail[i],
				WeatherCode: weatherResponse.Hourly.WeatherCode[i],
			},
		)
	}

	jsonData, err := json.Marshal(request)
	if err != nil {
		log.Printf("chatbot usecase json marshal error:%s",err.Error())
		return "", err
	}

	return string(jsonData), nil
}
