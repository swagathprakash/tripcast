package domain

import "context"

type Users struct {
	UserID       uint64
	FirstName    string
	LastName     string
	MobileNumber string
}

type UsersRepository interface {
	GetUserDetails(ctx context.Context, mobileNumber string) (*Users, error)
	Register(ctx context.Context, userData UsersDTO) error
}

type UsersUsecase interface {
	GetUserDetails(ctx context.Context, mobileNumber string) (*Users, error)
	GenerateOTP(mobileNumber string) error
	VerifyOTP(ctx context.Context, mobileNumber string, otp int) (*Users, error)
	Register(ctx context.Context, userData UsersDTO) error
}
