package usecase

import (
	"log"
	"slices"
	"trip-cast/constants"
	"trip-cast/internal/location"
	"trip-cast/internal/utils"
)

type NearByPlacesUsecase struct {
	placesAPI *location.Location
}

func NewNearbyPlacesUsecase(placesAPI *location.Location) *NearByPlacesUsecase {
	return &NearByPlacesUsecase{
		placesAPI: placesAPI,
	}
}

func (u *NearByPlacesUsecase) GetNearByPlaces(longitude, latitude float64) (*location.CategorizedPlaces, error) {
	params := location.PlacesRequestParams{
		Longitude:  longitude,
		Latitude:   latitude,
		Categories: constants.NearbyPlacesCategories,
	}
	responseFromPlacesAPI, err := u.placesAPI.GetNearByPlaces(params)
	if err != nil {
		log.Println("failed to return response from API with error", err)
		return nil, err
	}

	catogorizedPlaces := classifyTheResponse(responseFromPlacesAPI.Features)

	return &catogorizedPlaces, nil
}

func classifyTheResponse(placesResponse []location.Features) location.CategorizedPlaces {
	sights, shopping, beach, heritage, leisure, entertainment, attractions, hotels, food, tradition := make([]location.PlacesResponse, 0), make([]location.PlacesResponse, 0), make([]location.PlacesResponse, 0), make([]location.PlacesResponse, 0), make([]location.PlacesResponse, 0), make([]location.PlacesResponse, 0), make([]location.PlacesResponse, 0), make([]location.PlacesResponse, 0), make([]location.PlacesResponse, 0), make([]location.PlacesResponse, 0)

	for _, place := range placesResponse {
		placeResponse := location.PlacesResponse{
			Name:       place.Properties.Name,
			City:       place.Properties.City,
			Longitude:  place.Properties.Longitude,
			Latitude:   place.Properties.Latitude,
			Address:    place.Properties.FormattedAddress,
			Categories: place.Properties.Categories,
		}
		if utils.IsCommonElementPresent(placeResponse.Categories, constants.Entertainment) {
			entertainment = append(entertainment, placeResponse)
		}
		if utils.IsCommonElementPresent(placeResponse.Categories, constants.Attractions) {
			attractions = append(attractions, placeResponse)
		}
		if utils.IsCommonElementPresent(placeResponse.Categories, constants.Hotels) {
			hotels = append(hotels, placeResponse)
		}
		if utils.IsCommonElementPresent(placeResponse.Categories, constants.Food) {
			food = append(food, placeResponse)
		}
		if utils.IsCommonElementPresent(placeResponse.Categories, constants.Tradition) {
			tradition = append(tradition, placeResponse)
		}
		if utils.IsCommonElementPresent(placeResponse.Categories, constants.Sights) {
			sights = append(sights, placeResponse)
		}
		if utils.IsCommonElementPresent(placeResponse.Categories, constants.Shopping) {
			shopping = append(shopping, placeResponse)
		}
		if slices.Contains(placeResponse.Categories, constants.Beach) {
			beach = append(beach, placeResponse)
		}
		if utils.IsCommonElementPresent(placeResponse.Categories, constants.Heritage) {
			heritage = append(heritage, placeResponse)
		}
		if utils.IsCommonElementPresent(placeResponse.Categories, constants.Leisure) {
			leisure = append(leisure, placeResponse)
		}
	}

	locationType := location.LocationTypePlaces{
		Attractions:   attractions,
		Sights:        sights,
		Shopping:      shopping,
		Beach:         beach,
		Heritage:      heritage,
		Leisure:       leisure,
		Entertainment: entertainment,
	}

	response := location.CategorizedPlaces{
		Location:  locationType,
		Hotels:    hotels,
		Food:      food,
		Tradition: tradition,
	}

	return response
}
