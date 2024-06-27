package location

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

type Location struct {
	APIKey     string
	HttpClient http.Client
}

func NewLocationService(apiKey string) *Location {
	return &Location{
		APIKey:     apiKey,
		HttpClient: http.Client{},
	}
}

func (n *Location) GetNearByPlaces(params PlacesRequestParams) (*PlacesAPIResponse, error) {

	var response PlacesAPIResponse
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

	resp, err := n.HttpClient.Do(req)
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

func (n *Location) GetLocationDetails(lat, lon float64) (*LocationDetailsResponse, error) {

	var response LocationDetailsResponse

	baseUrl, err := url.Parse(constants.LocationDetailEndPoint)
	if err != nil {
		log.Println("failed to parse places url with error")
		return nil, err
	}

	latitude := fmt.Sprint(lat)
	longitude := fmt.Sprint(lon)

	queryParams := url.Values{}
	queryParams.Add("lat", latitude)
	queryParams.Add("lon", longitude)
	queryParams.Add("apiKey", n.APIKey)
	queryParams.Add("format", "json")

	baseUrl.RawQuery = queryParams.Encode()
	req, err := http.NewRequest("GET", baseUrl.String(), nil)
	if err != nil {
		log.Println("failed to create a location detail request with error", err)
		return nil, err
	}

	resp, err := n.HttpClient.Do(req)
	if err != nil {
		return nil, err
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Println("failed to read the body of the location detail response with error", err)
		return nil, err
	}

	err = json.Unmarshal(body, &response)
	if err != nil {
		log.Println("failed to unmarshal json location detail with error", err)
		return nil, err
	}

	return &response, nil

}
