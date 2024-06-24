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
	Success bool    `json:"success"`
	Errors  []error `json:"errors"`
}

func Fail(w http.ResponseWriter, status int, errors []error) {
	res := ErrorResponse{
		Success: false,
		Errors: errors,
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
		Data: dataBytes,
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
