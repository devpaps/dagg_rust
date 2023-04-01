use serde::{Deserialize, Serialize};

#[derive( Debug, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum OpenWeatherMapUnits {
    Metric,
    Imperial,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct ErrorResponse {
    pub lat: f64,
    pub timezone_offset: i32,
    pub lon: f64,
    pub current: Current,
    pub timezone: String,
    pub error_message: Option<String>,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct Api {
    pub lat: f64,
    pub lon: f64,
    pub timezone: String,
    pub timezone_offset: i32,
    pub current: Current,
    pub error_message: Option<String>
}

#[derive(Default, Debug, Deserialize, Serialize)]
pub struct Current {
    pub dt: i32,
    pub sunrise: i32,
    pub sunset: i32,
    pub temp: f32,
    pub feels_like: f32,
    pub pressure: f32,
    pub humidity: f32,
    pub dew_point: f32,
    pub uvi: f32,
    pub clouds: i32,
    pub visibility: i32,
    pub wind_speed: f32,
    pub wind_deg: i16,
    pub wind_gust: Option<f32>,
    pub weather: Vec<Weather>,
}

#[derive(Debug, Default, Deserialize, Serialize)]
pub struct Weather {
    pub id: i32,
    pub main: String,
    pub description: String,
    pub icon: String,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct Ghoat {
    pub name: String,
    pub lat: f32,
    pub lon: f32,
    pub country: String,
    // local_names: LocalNames,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct LocalNames {
    pub en: String,
    pub sv: String,
}
