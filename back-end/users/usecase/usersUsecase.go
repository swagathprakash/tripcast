package usecase

import (
	"trip-cast/domain"
)

type usersUsecase struct {
	userRepo domain.UsersRepository
}

func NewUsersUsecase(userRepo domain.UsersRepository) domain.UsersUsecase {
	return &usersUsecase{
		userRepo: userRepo,
	}
}
