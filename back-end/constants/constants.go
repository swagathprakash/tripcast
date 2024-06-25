package constants

import "errors"

// custom errors
var (
	ErrInvalidMobileNumber = errors.New("invalid mobile number")
	ErrOTPNotGenerated     = errors.New("OTP for the number is not generated")
	ErrOTPExpired          = errors.New("OTP is expired")
	ErrOTPNotMatched       = errors.New("OTP is not matched")
	ErrBadRequest          = errors.New("request body is invalid")
	ErrInternalServerError = errors.New("an internal server error occured")

	ErrLatitudeLongitudeRequired = errors.New("latitude/longitude is required")
	ErrValidDateFormat           = errors.New("valid format for start_date/end_date is 'YYYY-MM-DD'")
)

const (
	NumberOfDigitsInMobileNumber = 10
	MaxValueOfOTP                = 9999
	MinValueOfOTP                = 1000
	TwillioAPIEndPoint           = "https://api.twilio.com/2010-04-01/Accounts/%s/Messages.json"
	OTPMessage                   = "The OTP is : %d"
)

var (
	ValueTrue = true
	TimeZoneAsiaKolkata = "Asia/Kolkata"
)
