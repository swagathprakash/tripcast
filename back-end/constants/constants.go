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
	ErrNotFound            = errors.New("cannot find the requested resource")

	ErrLatitudeLongitudeRequired = errors.New("latitude/longitude is required")
	ErrValidDateFormat           = errors.New("valid format for start_date/end_date is 'YYYY-MM-DD'")

	ErrTripsNotFound = errors.New("no trip details are found")
)

const (
	NumberOfDigitsInMobileNumber = 10
	MaxValueOfOTP                = 9999
	MinValueOfOTP                = 1000
	TwillioAPIEndPoint           = "https://api.twilio.com/2010-04-01/Accounts/%s/Messages.json"
	OTPMessage                   = "The OTP is : %d"
	PlacesAPIEndPoint            = "https://api.geoapify.com/v2/places"
	LocationDetailEndPoint       = "https://api.geoapify.com/v1/geocode/reverse"
	Radius                       = 10000
	Datelayout                   = "2006-01-02"
)

var (
	ValueTrue           = true
	TimeZoneAsiaKolkata = "Asia/Kolkata"
)

var NearbyPlacesCategories = []string{
	"accommodation.hotel",
	"accommodation.hostel",
	"accommodation.motel",
	"commercial.shopping_mall",
	"catering.restaurant",
	"catering.fast_food",
	"catering.cafe",
	"catering.bar",
	"catering.pub",
	"tourism.attraction",
	"tourism.sights",
	"religion.place_of_worship",
	"beach",
	"entertainment.zoo",
	"entertainment.theme_park",
	"entertainment.water_park",
	"entertainment.activity_park",
	"heritage.unesco",
	"leisure.park",
	"entertainment.cinema",
}

var Entertainment = []string{
	"entertainment.theme_park",
	"entertainment.water_park",
	"entertainment.cinema",
	"entertainment.activity_park",
	"catering.pub",
}

var Attractions = []string{
	"tourism.attraction",
}

var Food = []string{
	"catering.restaurant",
	"catering.fast_food",
	"catering.cafe",
	"catering.bar",
	"catering.pub",
}

var Hotels = []string{
	"accommodation.hotel",
	"accommodation.hostel",
	"accommodation.motel",
}

var Tradition = []string{
	"religion.place_of_worship",
}

var Heritage = []string{
	"heritage.unesco",
}

var Leisure = []string{
	"leisure.park",
}

const Beach = "beach"

var Shopping = []string{
	"commercial.shopping_mall",
}

var Sights = []string{
	"tourism.sights",
	"entertainment.zoo",
}
