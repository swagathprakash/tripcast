package domain

type UsersDTO struct {
	UserID       uint64 `json:"user_id"`
	FirstName    string `json:"first_name"`
	LastName     string `json:"last_name"`
	MobileNumber string `json:"phone"`
}

type OTPRequest struct {
	OTP   int    `json:"otp"`
	Phone string `json:"phone"`
}

type OTPVerifiedResponse struct {
	Verified    bool     `json:"verified"`
	UserPresent bool     `json:"user_present"`
	UserData    UsersDTO `json:"user_data,omitempty"`
}

func (dto *UsersDTO) MapFromDomain(domain *Users) {
	dto.UserID = domain.UserID
	dto.FirstName = domain.FirstName
	dto.LastName = domain.LastName
	dto.MobileNumber = domain.MobileNumber
}