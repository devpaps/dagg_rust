#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_get_data() {
        let result = get_data("Stockholm".to_string(), "metric".to_string());
        assert!(result.is_ok());
    }
}

use crate::structs::{Api, Current, ErrorResponse, OpenWeatherMapUnits};
use dotenv::dotenv;
mod structs;

fn main() {
    dotenv().ok();
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_data])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn get_data(city: String, units: String) -> Result<Api, ErrorResponse> {
    if city.is_empty() {
        return Err(ErrorResponse {
            lat: 0.0,
            timezone_offset: 0,
            lon: 0.0,
            current: Current {
                temp: 0.0,
                feels_like: 0.0,
                weather: Vec::new(),
                visibility: 0,
                uvi: 0.0,
                wind_speed: 0.0,
                wind_deg: 0,
                clouds: 0,
                dt: 0,
                dew_point: 0.0,
                wind_gust: Some(0.0),
                pressure: 0.0,
                humidity: 0.0,
                sunrise: 0,
                sunset: 0,
            },
            timezone: "".to_string(),
            error_message: Some("Stad ej hittad".to_string()),
        });
    }
    // let units = match OpenWeatherMapUnits::Metric {
    //     OpenWeatherMapUnits::Imperial => "imperial",
    //     OpenWeatherMapUnits::Metric => "metric",
    // };
    let todo = get_weather(city, units).expect("error while getting data");
    Ok(todo)
}

// #[tauri::command]
// fn reset_to_imperal(city: String) {
//     println!("Reseting to {}", city);
//     // let units = match OpenWeatherMapUnits::Imperial {
//     //     OpenWeatherMapUnits::Imperial => "imperial",
//     //     OpenWeatherMapUnits::Metric => "metric",
//     // };
//     // let _x: String = "Hello from Rust!".into();
//
//     let _todo = get_data(city, units).expect("error while getting data");
// }

#[tokio::main]
async fn get_weather(city: String, units: String) -> Result<structs::Api, reqwest::Error> {
    let citas = &city;
    let limit: i8 = 5;
    let api_key = std::env::var("API_KEY").expect("API_KEY must be set");
    let lang = "sv";

    let testar = format!(
        "http://api.openweathermap.org/geo/1.0/direct?q={}&limit={}&appid={}&lang={}&units={}",
        citas, limit, api_key, lang, units
    );

    println!("{}", testar);

    let x = reqwest::Client::new()
        .get(testar)
        .send()
        .await?
        .json::<Vec<structs::Ghoat>>()
        .await?;

    if x.is_empty() || x[0].name.to_lowercase() != city {
        return Ok(Api {
            lat: 0.0,
            timezone_offset: 0,
            lon: 0.0,
            current: Current {
                temp: 0.0,
                feels_like: 0.0,
                weather: Vec::new(),
                visibility: 0,
                uvi: 0.0,
                wind_speed: 0.0,
                wind_deg: 0,
                clouds: 0,
                dt: 0,
                dew_point: 0.0,
                wind_gust: Some(0.0),
                pressure: 0.0,
                humidity: 0.0,
                sunrise: 0,
                sunset: 0,
            },
            timezone: "".to_string(),
            error_message: Some("Stad ej hittad".to_string()),
        });
    }
    println!("{:#?}", x);

    let lat: String = x[0].lat.to_string();
    let lon: String = x[0].lon.to_string();
    let url = format!(
        "https://api.openweathermap.org/data/3.0/onecall?lat={}&lon={}&appid={}&units={}&lang=sv",
        lat, lon, api_key, units
    );
    println!("{}", url);

    let client = reqwest::Client::new()
        .get(url)
        .send()
        .await?
        .json::<structs::Api>()
        .await?;

    let v: Vec<&Api> = std::iter::once(&client).collect();

    println!("{:#?}", v);
    println!("{}", city);

    Ok(client)
}
