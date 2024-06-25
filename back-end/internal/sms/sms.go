package sms

import (
	"fmt"
	"log"
	"net/http"
	"net/url"
	"strings"
	"trip-cast/constants"
)

type SMS struct {
	TwillioAccountSID  string
	TwillioPhoneNumber string
	TwillioAuthID      string
}

func NewSMSService(twillioAccountSID, twillioPhoneNumber, twillioAuthID string) *SMS {
	return &SMS{
		TwillioAccountSID:  twillioAccountSID,
		TwillioPhoneNumber: twillioPhoneNumber,
		TwillioAuthID:      twillioAuthID,
	}
}

func (s *SMS) SentSMS(content, mobileNumber string) error {

	client := http.Client{}
	endPoint := fmt.Sprintf(constants.TwillioAPIEndPoint, s.TwillioAccountSID)

	msgData := url.Values{}
	msgData.Set("To", mobileNumber)
	msgData.Set("From", s.TwillioPhoneNumber)
	msgData.Set("Body", content)

	msgDataReader := strings.NewReader(msgData.Encode())
	req, err := http.NewRequest("POST", endPoint, msgDataReader)
	if err != nil {
		return err
	}

	req.SetBasicAuth(s.TwillioAccountSID, s.TwillioAuthID)
	req.Header.Add("Content-Type", "application/x-www-form-urlencoded")
	req.Header.Add("Accept", "application/json")

	resp, err := client.Do(req)
	if err != nil {
		return err
	}

	if resp.StatusCode >= 200 && resp.StatusCode < 300 {
		log.Printf("%+v\n", resp)
		log.Println("------------Sent sms successfully------------")
	} else {
		log.Printf("%+v\n", resp)
	}

	return nil
}
