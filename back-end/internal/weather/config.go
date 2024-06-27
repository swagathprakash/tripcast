package weather

import "github.com/innotechdevops/openmeteo"

type Params struct {
	Latitude     float64
	Longitude    float64
	StartDate    string
	EndDate      string
	ForeCastDays int
}

type RequestParams struct {
	Latitude     float64 `json:"latitude"`
	Longitude    float64 `json:"longitude"`
	StartDate    string  `json:"start_date"`
	EndDate      string  `json:"end_date"`
	ForeCastDays int     `json:"forecast_days"`
}

// required hourly weather data
var requiredHourlyData = []string{
	openmeteo.HourlyTemperature2m,
	openmeteo.HourlyRelativeHumidity2m,
	openmeteo.HourlyApparentTemperature,
	openmeteo.HourlyApparentTemperature,
	openmeteo.HourlyWeatherCode,
	openmeteo.HourlyRain,
}

// required daily weather data
var requiredDailyData = []string{
	openmeteo.DailyTemperature2mMax,
	openmeteo.DailyTemperature2mMin,
	openmeteo.DailyApparentTemperatureMax,
	openmeteo.DailyApparentTemperatureMin,
	openmeteo.DailyUvIndexMax,
	openmeteo.DailyWeatherCode,
	openmeteo.DailyRainSum,
}

type WeatherResponse struct {
	Latitude       float64 `json:"latitude"`
	Longitude      float64 `json:"longitude"`
	City           string  `json:"city"`
	District       string  `json:"district"`
	State          string  `json:"state"`
	CurrentWeather struct {
		Time                string  `json:"time"`
		Temperature         float64 `json:"temperature"`
		ApparentTemperature float64 `json:"apparent_temperature"`
		RelativeHumidity    int     `json:"relativehumidity"`
		Rain                float64 `json:"rain"`
		WindSpeed           float64 `json:"windspeed"`
		IsDay               int     `json:"is_day"`
		WeatherCode         int     `json:"weathercode"`
		WeatherDetail       string  `json:"weather_detail"`
	} `json:"current_weather"`
	Hourly struct {
		Time                []string  `json:"time"`
		Temperature2M       []float64 `json:"temperature_2m"`
		RelativeHumidity2M  []int     `json:"relativehumidity_2m"`
		ApparentTemperature []float64 `json:"apparent_temperature"`
		WeatherCode         []int     `json:"weathercode"`
		WeatherDetail       []string  `json:"weather_detail"`
		Rain                []float64 `json:"rain"`
	} `json:"hourly"`
	Daily struct {
		Time                   []string  `json:"time"`
		Temperature2MMax       []float64 `json:"temperature_2m_max"`
		Temperature2MMin       []float64 `json:"temperature_2m_min"`
		ApparentTemperatureMax []float64 `json:"apparent_temperature_max"`
		ApparentTemperatureMin []float64 `json:"apparent_temperature_min"`
		UVIndexMax             []float64 `json:"uv_index_max"`
		WeatherCode            []int     `json:"weathercode"`
		WeatherDetail          []string  `json:"weather_detail"`
		RainSum                []float64 `json:"rain_sum"`
	} `json:"daily"`
}

var WMOCodesMap = map[int]string{
	0:  "Clear sky",
	1:  "Partly cloudy",
	2:  "Partly cloudy",
	3:  "Overcast",
	4:  "Smoke",
	5:  "Haze",
	6:  "Widespread dust",
	7:  "Raised dust",
	8:  "Dust whirl",
	9:  "Distant duststorm",
	10: "Mist",
	11: "Shallow fog",
	12: "Shallow fog",
	13: "Lightning",
	14: "Virga",
	15: "Distant rain",
	16: "Near rain",
	17: "Thunderstorm",
	18: "Squalls",
	19: "Funnel cloud",
	20: "Past drizzle",
	21: "Past rain",
	22: "Past snow",
	23: "Past mix",
	24: "Past freezing",
	25: "Past showers",
	26: "Past snow",
	27: "Past hail",
	28: "Past fog",
	29: "Past thunderstorm",
	30: "Past duststorm",
	31: "Current duststorm",
	32: "Decreasing duststorm",
	33: "Past severe duststorm",
	34: "Current severe duststorm",
	35: "Decreasing severe duststorm",
	40: "Distant fog",
	41: "Fog patches",
	42: "Thinning fog",
	43: "Thinning fog",
	44: "Unchanged fog",
	45: "Unchanged fog",
	46: "Thickening fog",
	47: "Thickening fog",
	48: "Rime fog",
	49: "Rime fog",
	50: "Light drizzle",
	51: "Light drizzle",
	52: "Moderate drizzle",
	53: "Moderate drizzle",
	54: "Heavy drizzle",
	55: "Heavy drizzle",
	56: "Freezing drizzle",
	57: "Heavy freezing drizzle",
	60: "Light rain",
	61: "Light rain",
	62: "Moderate rain",
	63: "Moderate rain",
	64: "Heavy rain",
	65: "Heavy rain",
	66: "Freezing rain",
	67: "Heavy freezing rain",
	68: "Light rain-snow",
	69: "Moderate rain-snow",
	70: "Light snow",
	71: "Continuous snow",
	72: "Moderate snow",
	73: "Continuous moderate snow",
	74: "Heavy snow",
	75: "Continuous heavy snow",
	80: "Light showers",
	81: "Moderate showers",
	82: "Heavy showers",
	83: "Light showers snow",
	84: "Moderate showers snow",
	85: "Heavy showers snow",
	90: "Thunderstorm",
	91: "Slight thunderstorm",
	92: "Moderate thunderstorm",
	93: "Slight hailstorm",
	94: "Moderate hailstorm",
	95: "Slight Thunderstorm",
	96: "Slight Thunderstorm",
	97: "Heavy Thunderstorm",
	98: "Heavy Thunderstorm",
	99: "Heavy Thunderstorm",
}
