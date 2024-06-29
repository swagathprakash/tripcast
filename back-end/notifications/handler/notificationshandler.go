package handler

import (
	"encoding/json"
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
	r.Delete("/notifications", handler.Delete)
	r.Patch("/notifications", handler.Update)
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
			Message: err.Error(),
		}})
		return
	}

	api.Success(w, http.StatusOK, notifications)
}

func (h *notificationHandler) Delete(w http.ResponseWriter, r *http.Request) {
	
	var request domain.NotificationModifyRequest
	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		api.Fail(w, http.StatusBadRequest, []api.Errors{{
			Code:    http.StatusBadRequest,
			Message: constants.ErrBadRequest.Error(),
		}})
		return
	}

	err = h.notificationUsecase.Delete(r.Context(), request.NotificationID)
	if err != nil {
		api.Fail(w, http.StatusInternalServerError, []api.Errors{{
			Code:    http.StatusInternalServerError,
			Message: constants.ErrInternalServerError.Error(),
		}})
		return
	}

	api.Success(w, http.StatusOK, "")
}

func (h *notificationHandler) Update(w http.ResponseWriter, r *http.Request) {
	
	var request domain.NotificationModifyRequest
	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		api.Fail(w, http.StatusBadRequest, []api.Errors{{
			Code:    http.StatusBadRequest,
			Message: constants.ErrBadRequest.Error(),
		}})
		return
	}

	err = h.notificationUsecase.UpdateNotifications(r.Context(), request.NotificationID)
	if err != nil {
		api.Fail(w, http.StatusInternalServerError, []api.Errors{{
			Code:    http.StatusInternalServerError,
			Message: err.Error(),
		}})
		return
	}

	api.Success(w, http.StatusOK, "")
}
