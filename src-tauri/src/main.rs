#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use reqwest::{self, Result};
use serde::{Deserialize, Serialize};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
// #[tauri::command]
fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_data])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[derive(Debug, Deserialize, Serialize)]
struct Api {
    lat: f64,
    lon: f64,
    timezone: String,
    timezone_offset: i32,
    current: Current,
}

#[derive(Default, Debug, Deserialize, Serialize)]
struct Current {
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
struct Weather {
    id: i32,
    main: String,
    description: String,
    icon: String,
}

#[derive(Debug, Deserialize, Serialize)]
struct Ghoat {
    name: String,
    lat: f32,
    lon: f32,
    country: String,
    // local_names: LocalNames,
}

#[derive(Debug, Deserialize, Serialize)]
struct LocalNames {
    en: String,
    sv: String,
}

#[tauri::command]
fn get_data(city: String) -> Api {
    let todo = get_weather(city).expect("error while getting data");
    todo
}

#[tokio::main]
async fn get_weather(city: String) -> Result<Api> {
    let citas = &city;
    let limit: i8 = 5;

    let testar = format!("http://api.openweathermap.org/geo/1.0/direct?q={}&limit={}&appid={}", citas, limit, API);

    let x = reqwest::Client::new()
        .get(testar)
        .send()
        .await?
        .json::<Vec<Ghoat>>()
        .await?;

    println!("{:#?}", x);

    let lat: String = x[0].lat.to_string();
    let lon: String = x[0].lon.to_string();
    const API: &str = "8e4904d074949fb1ae7d158b04961660";
    let url = format!(
        "https://api.openweathermap.org/data/3.0/onecall?lat={}&lon={}&appid={}&units=metric&lang=sv",
        lat, lon, API
    );


    let client = reqwest::Client::new()
        .get(url)
        .send()
        .await?
        .json::<Api>()
        .await?;

    let v: Vec<&Api> = std::iter::once(&client).collect();
    println!("{:#?}", v);
    println!("{}", city);
    Ok(client)
}

// #[tokio::main]
// async fn greet() -> Result<()> {
//     let weather = get_weather().await.unwrap();
//     println!("{:#?}", weather);
//     // const LAT: &str = "64.3293321993511";
//     // const LON: &str = "15.71462431066531";
//     // const API: &str = "8e4904d074949fb1ae7d158b04961660";
//     // let url = format!("https://api.openweathermap.org/data/2.5/weather?lat={}&lon={}&appid={}&units=metric", LAT, LON, API);
//     // // const URL: &str = "https://jsonplaceholder.typicode.com/todos?userId=1";
//     //
//     // let client = reqwest::Client::new()
//     //     .get(url)
//     //     .send()
//     //     .await?
//     //     .json::<Todo>()
//     //     .await?;
//     // println!("{:#?}", client);
//     // Ok(())
// }
