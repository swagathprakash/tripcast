package location

import "encoding/json"

type PlacesRequestParams struct {
	Latitude   float64
	Longitude  float64
	Categories []string
}

type PlacesAPIResponse struct {
	Type     string     `json:"type"`
	Features []Features `json:"features"`
}

type Features struct {
	Type       string   `json:"type"`
	Properties Property `json:"properties"`
	Geometries Geometry `json:"geometry"`
}

type Property struct {
	Name             string          `json:"name"`
	Country          string          `json:"country"`
	CountryCode      string          `json:"country_code"`
	State            string          `json:"state"`
	StateDistrict    string          `json:"state_district"`
	County           string          `json:"county"`
	City             string          `json:"city"`
	PostCode         string          `json:"postcode"`
	Street           string          `json:"street"`
	Longitude        float64         `json:"lon"`
	Latitude         float64         `json:"lat"`
	StateCode        string          `json:"state_code"`
	FormattedAddress string          `json:"formatted"`
	AddressLine1     string          `json:"address_line1"`
	AddressLine2     string          `json:"address_line2"`
	Categories       []string        `json:"categories"`
	Details          []string        `json:"details"`
	DataSource       json.RawMessage `json:"datasource"`
	OpeningHours     string          `json:"opening_hours"`
	Operator         string          `json:"operator"`
	ContactDetails   Contact         `json:"contact"`
}

type Contact struct {
	Phone any    `json:"phone"`
	Email string `json:"email"`
}

type Geometry struct {
	Type       string    `json:"type"`
	Cordinates []float64 `json:"coordinates"`
}

type CategorizedPlaces struct {
	Location  LocationTypePlaces `json:"location"`
	Hotels    []PlacesResponse   `json:"hotels"`
	Food      []PlacesResponse   `json:"food"`
	Tradition []PlacesResponse   `json:"tradition"`
}

type LocationTypePlaces struct {
	Attractions   []PlacesResponse `json:"attractions,omitempty"`
	Sights        []PlacesResponse `json:"sights,omitempty"`
	Shopping      []PlacesResponse `json:"shopping,omitempty"`
	Beach         []PlacesResponse `json:"beach,omitempty"`
	Heritage      []PlacesResponse `json:"heritage,omitempty"`
	Leisure       []PlacesResponse `json:"leisure,omitempty"`
	Entertainment []PlacesResponse `json:"entertainment,omitempty"`
}

type PlacesResponse struct {
	Name       string   `json:"name"`
	City       string   `json:"city"`
	Longitude  float64  `json:"logitude"`
	Latitude   float64  `json:"latitude"`
	Address    string   `json:"address"`
	Categories []string `json:"categories"`
}

type NearByPlaceRequestBody struct {
	Latitude  float64 `json:"latitude"`
	Longitude float64 `json:"longitude"`
}

type LocationDetailsResponse struct {
	Result []struct {
		Name     string `json:"name"`
		Country  string `json:"country"`
		State    string `json:"state"`
		District string `json:"state_district"`
		County   string `json:"county"`
		City     string `json:"city"`
		Postcode string `json:"postcode"`
		Address  string `json:"formatted"`
	} `json:"results"`
}
