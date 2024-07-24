package middlewares

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"trip-cast/constants"
	"trip-cast/domain"
	"trip-cast/internal/api"
	"trip-cast/internal/env"

	"github.com/golang-jwt/jwt/v5"
)

type middlewares struct {
	env      *env.EnvVariables
	userRepo domain.UsersRepository
}

func Init(env *env.EnvVariables, userRepo domain.UsersRepository) middlewares {
	return middlewares{
		env:      env,
		userRepo: userRepo,
	}
}

func (m middlewares) ValidateAccessToken() func(http.Handler) http.Handler {
	return func(originalHandler http.Handler) http.Handler {

		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			ctx := r.Context()

			if r.URL.Path == "/verify-otp" || r.URL.Path == "/get-otp" {
				originalHandler.ServeHTTP(w, r)
				return
			}

			cookieToken, err := r.Cookie("user_token")
			if err != nil {
				log.Println(err.Error())
				api.Fail(w, http.StatusUnauthorized, []api.Errors{{
					Code:    http.StatusUnauthorized,
					Message: "invalid cookie / cookie not present",
				}})
				return
			}

			token, err := jwt.Parse(cookieToken.Value, func(token *jwt.Token) (interface{}, error) {

				if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
					return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
				}
				return []byte(m.env.SecretKey), nil
			})

			if err != nil {
				log.Println(err.Error())
				api.Fail(w, http.StatusUnauthorized, []api.Errors{{
					Code:    http.StatusUnauthorized,
					Message: "unauthorised user",
				}})
				return
			}

			if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {

				userPhone := claims["phone"]
				user, err := m.userRepo.GetUserDetails(ctx, userPhone.(string))
				if err != nil {
					api.Fail(w, http.StatusInternalServerError, []api.Errors{{
						Code:    http.StatusInternalServerError,
						Message: err.Error(),
					}})
					return
				}

				ctx = context.WithValue(ctx, constants.ContextUserIDKey, user.UserID)
				r = r.WithContext(ctx)

				originalHandler.ServeHTTP(w, r)

			} else {
				log.Println("unauthorised user")
				api.Fail(w, http.StatusUnauthorized, []api.Errors{{
					Code:    http.StatusUnauthorized,
					Message: "unauthorised user",
				}})
				return
			}
		})
	}
}
