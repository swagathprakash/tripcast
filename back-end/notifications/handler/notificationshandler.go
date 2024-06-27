package handler

import (
	"net/http"
	"strconv"
	"trip-cast/constants"
	"trip-cast/domain"
	"trip-cast/internal/api"

	"github.com/go-chi/chi/v5"
)

type notificationHandler struct {
	notificationUsecase domain.NotificationUsecase
}

func NewNotificationHandler(r *chi.Mux, notificationUsecase domain.NotificationUsecase) {
	handler := &notificationHandler{
		notificationUsecase: notificationUsecase,
	}
	r.Get("/notifications", handler.List)
}

func (h *notificationHandler) List(w http.ResponseWriter, r *http.Request) {
	userIDParam := r.URL.Query().Get("user_id")
	userID, err := strconv.ParseUint(userIDParam, 10, 64)
	if err != nil {
		api.Fail(w, http.StatusBadRequest, []api.Errors{{
			Code:    http.StatusBadRequest,
			Message: constants.ErrBadRequest.Error(),
		}})
		return
	}

	notifications, err := h.notificationUsecase.List(r.Context(), userID)
	if err != nil {
		api.Fail(w, http.StatusInternalServerError, []api.Errors{{
			Code:    http.StatusInternalServerError,
			Message: constants.ErrInternalServerError.Error(),
		}})
		return
	}

	api.Success(w, http.StatusOK, notifications)
}
