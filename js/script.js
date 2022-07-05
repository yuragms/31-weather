"use strict";

// Блок с погодой

const weatherBlock = document.querySelector("#weather");

async function loadweather(e) {
  weatherBlock.innerHTML = `
    <div class="weather__loading">
    <img src="img/spiner2.gif" alt="Loading...">
    </div>`;
  const server1 =
    "https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=522f7ec766b55c89fccbc47a4e7a72c0";
  const server =
    "https://api.openweathermap.org/data/2.5/weather?units=metric&q=Kyiv&appid=0fded04f70c8c96d808e01cc9165b89b";
  const response = await fetch(server, { method: "GET" });
  const responseResult = await response.json();
  const mykey = "0fded04f70c8c96d808e01cc9165b89b";

  if (response.ok) {
    getWeather(responseResult);
  } else {
    weatherBlock.innerHTML = responseResult.message;
  }
}

function getWeather(data) {
  console.log(data);

  const location = data.name;
  const temp = Math.round(data.main.temp);
  const feelsLike = Math.round(data.main.feels_like);
  const weatherStatus = data.weather[0].main;
  const weatherIcon = data.weather[0].icon;

  const template = `
        <div class="weather__header">
          <div class="weathr__main">
            <div class="weather__city">${location}</div>
            <div class="weather__status">${weatherStatus}</div>
          </div>
          <div class="weather__icon">
          <img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="${weatherStatus}">
        </div>
        </div>
        
        <div class="weather__temp">${temp}</div>
        <div class="weather__feels-like">${feelsLike}</div>`;

  weatherBlock.innerHTML = template;
}

if (weatherBlock) {
  loadweather();
}
