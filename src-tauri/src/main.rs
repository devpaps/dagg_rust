#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use crate::structs::Api;
mod structs;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_data])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn get_data(city: String) -> structs::Api {
    let todo = get_weather(city).expect("error while getting data");
    todo
}

// TODO: Need to add error handling for when the city is not found
#[tokio::main]
async fn get_weather(city: String) -> Result<structs::Api, reqwest::Error> {
    let citas = &city;
    let limit: i8 = 5;
    let api_url = "8e4904d074949fb1ae7d158b04961660";

    let testar = format!(
        "http://api.openweathermap.org/geo/1.0/direct?q={}&limit={}&appid={}",
        citas, limit, api_url
    );

    let x = reqwest::Client::new()
        .get(testar)
        .send()
        .await?
        .json::<Vec<structs::Ghoat>>()
        .await?;

    println!("{:#?}", x);

    let lat: String = x[0].lat.to_string();
    let lon: String = x[0].lon.to_string();
    // const API = dotenv().ok();
    // std::env::var("API_KEY").unwrap()
    let url = format!(
        "https://api.openweathermap.org/data/3.0/onecall?lat={}&lon={}&appid={}&units=metric&lang=sv",
        lat, lon, api_url
    );

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
