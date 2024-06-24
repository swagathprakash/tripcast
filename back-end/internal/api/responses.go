package api

import (
	"encoding/json"
	"net/http"
)

type SuccessResponse struct {
	Success bool            `json:"success"`
	Data    json.RawMessage `json:"data"`
}

type ErrorResponse struct {
	Success bool     `json:"success"`
	Errors  []Errors `json:"errors"`
}

type Errors struct {
	Code    int    `json:"error code"`
	Message string `json:"message"`
}

func Fail(w http.ResponseWriter, status int, errors []Errors) {
	res := ErrorResponse{
		Success: false,
		Errors:  errors,
	}

	resBytes, err := json.Marshal(res)
	if err != nil {
		http.Error(
			w,
			http.StatusText(http.StatusInternalServerError),
			http.StatusInternalServerError,
		)
		return
	}
	w.WriteHeader(status)
	w.Write(resBytes)
}

func Success(w http.ResponseWriter, status int, data any) {
	dataBytes, err := json.Marshal(data)
	if err != nil {
		http.Error(
			w,
			http.StatusText(http.StatusInternalServerError),
			http.StatusInternalServerError,
		)
		return
	}

	res := SuccessResponse{
		Success: true,
		Data:    dataBytes,
	}

	resBytes, err := json.Marshal(res)
	if err != nil {
		http.Error(
			w,
			http.StatusText(http.StatusInternalServerError),
			http.StatusInternalServerError,
		)
		return
	}

	w.WriteHeader(status)
	w.Write(resBytes)
}
