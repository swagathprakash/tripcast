package usecase

import (
	"context"
	// "fmt"
	"log"
	// "math/rand"
	"time"
	"trip-cast/constants"
	"trip-cast/domain"
	"trip-cast/internal/sms"
	// "trip-cast/internal/utils"
)

type usersUsecase struct {
	userRepo domain.UsersRepository
	sms      *sms.SMS
}

func NewUsersUsecase(userRepo domain.UsersRepository, sms *sms.SMS) domain.UsersUsecase {
	return &usersUsecase{
		userRepo: userRepo,
		sms:      sms,
	}
}

type otpInfo struct {
	otp int
	exp time.Time
}

var otpMap = make(map[string]otpInfo)

func (u *usersUsecase) GetUserDetails(ctx context.Context, mobileNumber string) (*domain.Users, error) {
	users, err := u.userRepo.GetUserDetails(ctx, mobileNumber)
	if err != nil {
		log.Println("failed to get user details with error %w", err)
		return nil, err
	}
	return users, nil
}

func (u *usersUsecase) GenerateOTP(mobileNumber string) error {

	// uncomment the code for OTP generation
	// otp := rand.Intn(constants.MaxValueOfOTP-constants.MinValueOfOTP+1) + constants.MinValueOfOTP
	// mobileNumberWithInidanCountryCode := utils.ConvertToIndianMobileNumberFormat(mobileNumber)
	// err := u.sms.SentSMS(fmt.Sprintf(constants.OTPMessage, otp), mobileNumberWithInidanCountryCode)
	// if err != nil {
	// 	log.Println("failed to sent otp with error", err)
	// 	return err
	// }

	otpMap[mobileNumber] = otpInfo{
		otp: 1234,
		exp: time.Now().Add(2 * time.Minute),
	}
	return nil
}

func (u *usersUsecase) VerifyOTP(ctx context.Context, mobileNumber string, otp int) (*domain.Users, error) {
	cachedOTP, ok := otpMap[mobileNumber]
	if !ok {
		log.Println("failed to retrive otp from cache")
		return nil, constants.ErrOTPNotGenerated
	}
	if !time.Now().Before(cachedOTP.exp) {
		log.Println("OTP expired")
		delete(otpMap, mobileNumber)
		return nil, constants.ErrOTPExpired
	}
	if otp != cachedOTP.otp {
		log.Println("OTP not matched")
		return nil, constants.ErrOTPNotMatched
	}
	log.Println("OTP is correct")
	delete(otpMap, mobileNumber)
	userData, err := u.userRepo.GetUserDetails(ctx, mobileNumber)
	if err != nil {
		log.Println("failed to fetch user details with error", err)
		return nil, err
	}
	return userData, err
}

func (u *usersUsecase) Register(ctx context.Context, userData domain.UsersDTO) (uint64, error) {

	userID, err := u.userRepo.Register(ctx, userData)
	if err != nil {
		log.Println("failed to store user data with error", err)
		return 0, err
	}
	return userID, nil
}
