package places

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
	"strings"
	"trip-cast/constants"
)

type NearByPlaces struct {
	APIKey string
}

func NewNearByPlacesAPI(apiKey string) *NearByPlaces {
	return &NearByPlaces{
		APIKey: apiKey,
	}
}

func (n *NearByPlaces) GetNearByPlaces(params PlacesRequestParams) (*PlacesAPIResponse, error) {

	var response PlacesAPIResponse
	client := http.Client{}
	baseUrl, err := url.Parse(constants.PlacesAPIEndPoint)
	if err != nil {
		log.Println("failed to parse places url with error")
		return nil, err
	}

	filter := fmt.Sprintf("circle:%f,%f,%d", params.Longitude, params.Latitude, constants.Radius)

	queryParams := url.Values{}
	queryParams.Add("filter", filter)
	queryParams.Add("categories", strings.Join(params.Categories, ","))
	queryParams.Add("apiKey", n.APIKey)

	baseUrl.RawQuery = queryParams.Encode()
	req, err := http.NewRequest("GET", baseUrl.String(), nil)
	if err != nil {
		log.Println("failed to create a request with error", err)
		return nil, err
	}

	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Println("failed to read the body of the response with error", err)
		return nil, err
	}

	log.Printf("%+v\n", resp.Status)

	err = json.Unmarshal(body, &response)
	if err != nil {
		log.Println("failed to unmarshal json with error", err)
		return nil, err
	}

	return &response, nil
}
