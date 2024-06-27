package handler

import (
	"encoding/json"
	"errors"
	"log"
	"net/http"
	"trip-cast/constants"
	"trip-cast/domain"
	"trip-cast/internal/api"

	"github.com/go-chi/chi/v5"
)

type usersHandler struct {
	usersUsecase domain.UsersUsecase
}

func NewUsersHandler(r *chi.Mux, usersUsecase domain.UsersUsecase) {
	usersHandler := &usersHandler{
		usersUsecase: usersUsecase,
	}
	r.Get("/get-otp", usersHandler.GenerateOTP)
	r.Post("/verify-otp", usersHandler.VerifyOTP)
	r.Post("/register", usersHandler.Register)
	r.Get("/users", usersHandler.GetUserDetails)
}

func (h *usersHandler) VerifyOTP(w http.ResponseWriter, r *http.Request) {
	var request domain.OTPRequest
	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		log.Println("failed to decode request")
		api.Fail(w, http.StatusBadRequest, []api.Errors{{
			Code:    http.StatusBadRequest,
			Message: constants.ErrBadRequest.Error(),
		}})
		return
	}
	userData, err := h.usersUsecase.VerifyOTP(r.Context(), request.Phone, request.OTP)
	if err != nil {
		if errors.Is(err, constants.ErrOTPNotGenerated) {
			api.Fail(w, http.StatusNotFound, []api.Errors{{
				Code:    http.StatusNotFound,
				Message: constants.ErrOTPNotGenerated.Error(),
			}})
			return
		}
		if errors.Is(err, constants.ErrOTPExpired) {
			api.Fail(w, http.StatusGone, []api.Errors{{
				Code:    http.StatusGone,
				Message: constants.ErrOTPExpired.Error(),
			}})
			return
		}
		if errors.Is(err, constants.ErrOTPNotMatched) {
			api.Fail(w, http.StatusUnauthorized, []api.Errors{{
				Code:    http.StatusGone,
				Message: constants.ErrOTPNotMatched.Error(),
			}})
			return
		}
		api.Fail(w, http.StatusInternalServerError, []api.Errors{{
			Code:    http.StatusInternalServerError,
			Message: constants.ErrInternalServerError.Error(),
		}})
		return
	}
	if userData == nil {
		res := domain.OTPVerifiedResponse{
			Verified:    true,
			UserPresent: false,
		}
		api.Success(w, http.StatusOK, res)
		return
	}
	var userDataDTO domain.UsersDTO
	userDataDTO.MapFromDomain(userData)
	res := domain.OTPVerifiedResponse{
		Verified:    true,
		UserPresent: true,
		UserData:    userDataDTO,
	}
	api.Success(w, http.StatusOK, res)
}

func (h *usersHandler) Register(w http.ResponseWriter, r *http.Request) {
	var (
		userData domain.UsersDTO
	)

	err := json.NewDecoder(r.Body).Decode(&userData)
	if err != nil {
		api.Fail(w, http.StatusBadRequest, []api.Errors{{
			Code:    http.StatusBadRequest,
			Message: constants.ErrBadRequest.Error(),
		}})
		return
	}

	userID, err := h.usersUsecase.Register(r.Context(), userData)
	if err != nil {
		api.Fail(w, http.StatusInternalServerError, []api.Errors{{
			Code:    http.StatusInternalServerError,
			Message: constants.ErrInternalServerError.Error(),
		}})
		return
	}
	response := domain.UserRegisterResponse{
		UserID: userID,
	}
	api.Success(w, http.StatusOK, response)
}

func (h *usersHandler) GenerateOTP(w http.ResponseWriter, r *http.Request) {
	mobileNumber := r.URL.Query().Get("phone")
	if len(mobileNumber) < constants.NumberOfDigitsInMobileNumber {
		api.Fail(w, http.StatusBadRequest, []api.Errors{{
			Code:    http.StatusBadRequest,
			Message: constants.ErrInvalidMobileNumber.Error(),
		}})
		return
	}
	err := h.usersUsecase.GenerateOTP(mobileNumber)
	if err != nil {
		api.Fail(w, http.StatusInternalServerError, []api.Errors{{
			Code:    http.StatusInternalServerError,
			Message: constants.ErrInternalServerError.Error(),
		}})
		return
	}
	api.Success(w, http.StatusOK, "")
}

func (h *usersHandler) GetUserDetails(w http.ResponseWriter, r *http.Request) {

	var response domain.UsersDTO
	mobileNumber := r.URL.Query().Get("phone")
	if len(mobileNumber) == 0 {
		api.Fail(w, http.StatusBadRequest, []api.Errors{{
			Code:    http.StatusBadRequest,
			Message: constants.ErrBadRequest.Error(),
		}})
		return
	}

	userDetails, err := h.usersUsecase.GetUserDetails(r.Context(), mobileNumber)
	if err != nil {
		api.Fail(w, http.StatusInternalServerError, []api.Errors{{
			Code:    http.StatusInternalServerError,
			Message: constants.ErrInternalServerError.Error(),
		}})
		return
	}
	if userDetails == nil {
		api.Fail(w, http.StatusNotFound, []api.Errors{{
			Code:    http.StatusNotFound,
			Message: constants.ErrNotFound.Error(),
		}})
		return
	}

	response.MapFromDomain(userDetails)

	api.Success(w, http.StatusOK, response)
}
