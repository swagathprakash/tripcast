package handler

import (
	"encoding/json"
	"log"
	"net/http"
	"trip-cast/constants"
	"trip-cast/internal/api"
	"trip-cast/internal/gemini"

	"github.com/go-chi/chi/v5"
)

type chatBotHandler struct {
	model *gemini.Model
}

func NewChatBotHandler(r *chi.Mux, model *gemini.Model) {
	chatBotHandler := chatBotHandler{
		model: model,
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

	responseString, tokensUsed, err := h.model.GenerateResponse(ctx, request.Prompt)
	if err != nil {
		log.Printf("model.GenerateResponse failed with error : %s", err.Error())
		api.Fail(w, http.StatusInternalServerError, []api.Errors{{
			Code:    http.StatusInternalServerError,
			Message: err.Error(),
		}})
		return
	}

	response := gemini.Response{
		Response:   string(responseString),
		TokensUsed: tokensUsed,
	}

	api.Success(w, http.StatusOK, response)

}
