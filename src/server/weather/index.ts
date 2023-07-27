"use server"

import { states } from "@/utils/state";



 export async function informationtemp( state: string) {

    const apiWeaterURl = `https://api.openweathermap.org/geo/1.0/direct?q=${state}&limit=1&appid=${process.env.NEXT_PUBLIC_API_WEATHER_KEY}&lang=pt_br`;

    const responseWeather = await fetch(apiWeaterURl);
    const responseWeatherJson = await responseWeather.json();

    const lat = responseWeatherJson[0].lat;
    const lon = responseWeatherJson[0].lon;

    const weather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.NEXT_PUBLIC_API_WEATHER_KEY}&lang=pt_br`;

    const responseWeatherlocal = await fetch(weather);

    const responseWeatherlocalJson = await responseWeatherlocal.json()

    const temp = String(parseInt(responseWeatherlocalJson.main.temp)) + "°C";
    const descriptiontemp = responseWeatherlocalJson.weather[0].description;

    const iconTemp = responseWeatherlocalJson.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconTemp}.png`;

    return {state, lat, lon, temp, descriptiontemp, iconUrl};
}