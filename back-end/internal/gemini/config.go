package gemini

type RequestParams struct {
	Latitude         float64              `json:"latitude"`
	Longitude        float64              `json:"longitude"`
	StartingLocation string               `json:"starting_location"`
	Destination      string               `json:"destination"`
	StartDate        string               `json:"start_date"`
	EndDate          string               `json:"end_date"`
	Companions       string               `json:"companions"`
	Duration         int                  `json:"duration"`
	Purpose          string               `json:"purpose"`
	Forecast         []RequestWeatherInfo `json:"forecast"`
}

type RequestWeatherInfo struct {
	Date    string `json:"date"`
	Weather string `json:"weather"`
}

type Response struct {
	Response   string `json:"response"`
	TokensUsed int32  `json:"tokens_used"`
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
    "duration": "Integer - Number of days for the trip",
    "purpose": "String - The main purpose of the trip",
    "forecast": [
      {
        "date": "String - Date in YYYY-MM-DD format",
        "weather": "String - 2 word weather description of the day"
      }
    ]
}
You must utilize the data given in the above format to generate response in json format as below
{
    "starting_location": "String - Where the user is starting their journey from",
    "destination": "String - The user's chosen destination",
    "start_date": "String - The user's chosen start date of trip",
    "end_date": "String - The user's chosen end date of trip",
    "companions": "String - Description of who the user is travelling with",
    "duration": "Integer - Number of days for the trip",
    "purpose": "String - The main purpose of the trip",
    "forecast": [
      {
        "day": "String - Date in YYYY-MM-DD format",
        "weather": "String - 2 word weather description of the day"
      }
    ],
    "itinerary": [
      {
        "day": "String - Date and time in YYYY-MM-DD HH:MM format",
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
    "packingRecommendations": [
      "String - List of items recommended to pack based on activities and weather"
    ],
    "safetyTips": ["String - Weather-related safety tips for the destination"]
  }
You must only respond in the above format
`
