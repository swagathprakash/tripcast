package gemini

type RequestParams struct {
	Latitude         float64              `json:"latitude"`
	Longitude        float64              `json:"longitude"`
	StartingLocation string               `json:"starting_location"`
	Destination      string               `json:"destination"`
	StartDate        string               `json:"start_date"`
	EndDate          string               `json:"end_date"`
	Companions       string               `json:"companions"`
	ModeOfTransport  string               `json:"mode_of_transport"`
	Purpose          string               `json:"purpose"`
	Forecast         []RequestWeatherInfo `json:"forecast"`
}

type RequestWeatherInfo struct {
	Time        string `json:"time"`
	Weather     string `json:"weather"`
	WeatherCode int    `json:"weather_code"`
}

type Activity struct {
	Time             string `json:"time"`
	Location         string `json:"location"`
	Description      string `json:"description"`
	WeatherCondition string `json:"weatherCondition"`
}

type Itinerary []struct {
	Day        string     `json:"day"`
	Activities []Activity `json:"activities"`
}

type Forecast []struct {
	Time        string `json:"time"`
	Weather     string `json:"weather"`
	WeatherCode int    `json:"weather_code"`
}

type Response struct {
	StartingLocation string    `json:"starting_location"`
	Latitude         float64   `json:"latitude"`
	Longitude        float64   `json:"longitude"`
	Destination      string    `json:"destination"`
	StartDate        string    `json:"start_date"`
	EndDate          string    `json:"end_date"`
	Companions       string    `json:"companions"`
	Duration         int       `json:"duration"`
	Purpose          string    `json:"purpose"`
	Itinerary        Itinerary `json:"itinerary"`
	Forecast         Forecast  `json:"forecast"`
	PackingItems     []string  `json:"packingRecommendations"`
	SafetyTips       []string  `json:"safetyTips"`
}

const UserPart = `
You are an intelligent Weather-Based Trip Companion that helps users plan their travel experiences by utilizing real-time weather data and forecasts 
You will get a json format text as input with appropriate values in the following format
{
    "starting_location": "String - Where the user is starting their journey from",
    "destination": "String - The user's chosen destination",
    "start_date": "String - The user's chosen start date of trip",
    "end_date": "String - The user's chosen end date of trip",
    "companions": "String - Description of who the user is travelling with",
    "purpose": "String - The main purpose of the trip",
    "mode_of_transport": "String - mode of transport for the trip (car,two-wheeler,bus,train,flight)"
    "forecast": [
      {
        "time": "String - Date and time in YYYY-MM-DDTHH:MM format, time part would be in 24H format",
        "weather": "String - 2 word weather description of each hour of the day",
        "weather_code": Integer - WMO weather code of each hour of the day
      }
    ]
}
You must utilize the data given in the above format to generate a trip itinerary based on 
- purpose of visit
- mode of transport
- travel time between places for the mode of transport
- companions
- weather conditions of that time
Generate response in json format as below
{
    "starting_location": "String - Where the user is starting their journey from",
    "destination": "String - The user's chosen destination",
    "start_date": "String - The user's chosen start date of trip",
    "end_date": "String - The user's chosen end date of trip",
    "companions": "String - Description of who the user is travelling with",
    "duration": "Integer - Number of days for the trip",
    "purpose": "String - The main purpose of the trip",
    "itinerary": [
      {
        "day": "String - Date and time in YYYY-MM-DD format",
        "activities": [
          {
            "time": "String - Time of the activity in 24-hour format",
            "location": "String-Location of the activity",
            "description": "String - Description of the activity",
            "weatherCondition": "String - Expected weather condition during this activity"
          }
        ]
      }
    ],
    "forecast": [
      {
        "time": "String - day and time from itinerary in YYYY-MM-DDTHH:MM format",
        "weather": "String - 2 word weather description of that time",
        "weather_code": Integer - WMO weather code of each hour of that time
      }
    ],
    "packingRecommendations": [
      "String - List of items recommended to pack based on activities and weather"
    ],
    "safetyTips": ["String - Weather-related safety tips for the destination"]
  }
You must only respond in the above format
`
