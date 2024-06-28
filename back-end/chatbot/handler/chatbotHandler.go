package handler

import (
	"encoding/json"
	"log"
	"net/http"
	"strings"
	chatBotUsecase "trip-cast/chatbot/usecase"
	"trip-cast/constants"
	"trip-cast/internal/api"
	"trip-cast/internal/gemini"
	"trip-cast/internal/weather"
	weatherUsecase "trip-cast/weather/usecase"

	"github.com/go-chi/chi/v5"
)

type chatBotHandler struct {
	model          *gemini.Model
	chatBotUsecase *chatBotUsecase.ChatBotUsecase
	weatherUsecase *weatherUsecase.WeatherUsecase
}

func NewChatBotHandler(r *chi.Mux, model *gemini.Model, chatBotUsecase *chatBotUsecase.ChatBotUsecase, weatherUsecase *weatherUsecase.WeatherUsecase) {
	chatBotHandler := chatBotHandler{
		model:          model,
		chatBotUsecase: chatBotUsecase,
		weatherUsecase: weatherUsecase,
	}
	r.Post("/ask-model", chatBotHandler.AskModel)
}

func (h chatBotHandler) AskModel(w http.ResponseWriter, r *http.Request) {

	ctx := r.Context()
	var request gemini.RequestParams

	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		log.Println("failed to decode request")
		api.Fail(w, http.StatusBadRequest, []api.Errors{{
			Code:    http.StatusBadRequest,
			Message: constants.ErrBadRequest.Error(),
		}})
		return
	}

	weatherParams := weather.Params{
		Latitude:  request.Latitude,
		Longitude: request.Longitude,
		StartDate: request.StartDate,
		EndDate:   request.EndDate,
	}
	weatherResponse, err := h.weatherUsecase.GetWeatherDetails(weatherParams)
	if err != nil {
		log.Printf("h.weatherUsecase.GetWeatherDetails failed with error:%s", err.Error())
		api.Fail(w, http.StatusInternalServerError, []api.Errors{{
			Code:    http.StatusInternalServerError,
			Message: err.Error(),
		}})
		return
	}

	prompt, err := h.chatBotUsecase.BuildPrompt(weatherResponse, &request)
	if err != nil {
		log.Printf("usecase.GetWeatherForecast failed with error:%s", err.Error())
		api.Fail(w, http.StatusInternalServerError, []api.Errors{{
			Code:    http.StatusInternalServerError,
			Message: err.Error(),
		}})
		return
	}

	responseString, tokensUsed, err := h.model.GenerateResponse(ctx, prompt)
	if err != nil {
		log.Printf("model.GenerateResponse failed with error : %s", err.Error())
		api.Fail(w, http.StatusInternalServerError, []api.Errors{{
			Code:    http.StatusInternalServerError,
			Message: err.Error(),
		}})
		return
	}

	response := gemini.Response{}
	log.Println("Tokens used:", tokensUsed)

	trimmedResponse := strings.ReplaceAll(string(responseString), "```json", "")
	finalResponseString := strings.ReplaceAll(trimmedResponse, "```", "")

	err = json.Unmarshal([]byte(finalResponseString), &response)
	if err != nil {
		log.Printf("chat bot handler Unmarshal error : %s", err.Error())
		api.Fail(w, http.StatusInternalServerError, []api.Errors{{
			Code:    http.StatusInternalServerError,
			Message: err.Error(),
		}})
		return
	}

	response.Latitude = request.Latitude
	response.Longitude = request.Longitude

	api.Success(w, http.StatusOK, response)

}
