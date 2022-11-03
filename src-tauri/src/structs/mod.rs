use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize)]
pub struct Api {
    pub(crate) lat: f64,
    pub(crate) lon: f64,
    pub(crate) timezone: String,
    pub(crate) timezone_offset: i32,
    pub(crate) current: Current,
}

#[derive(Default, Debug, Deserialize, Serialize)]
pub struct Current {
    dt: i32,
    sunrise: i32,
    sunset: i32,
    temp: f32,
    feels_like: f32,
    pressure: f32,
    humidity: f32,
    dew_point: f32,
    uvi: f32,
    clouds: i32,
    visibility: i32,
    wind_speed: f32,
    wind_deg: i16,
    wind_gust: Option<f32>,
    weather: Vec<Weather>,
}

#[derive(Debug, Default, Deserialize, Serialize)]
pub struct Weather {
    id: i32,
    main: String,
    description: String,
    icon: String,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct Ghoat {
    name: String,
    pub lat: f32,
    pub lon: f32,
    country: String,
    // local_names: LocalNames,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct LocalNames {
    en: String,
    sv: String,
}
