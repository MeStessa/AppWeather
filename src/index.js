let now = new Date();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `Last updated on  ${hour}:${minutes}`;

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let today = document.querySelector("#today");
today.innerHTML = `${day}`;

function formatHours(timestamp){

  let now = new Date(timestamp);
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
  return `${hour}:${minutes}`
}

function checkCelsius(event) {
  event.preventDefault();
  let temperatureCelsius = document.querySelector("#current-temperature");
  temperatureCelsius.innerHTML=tempCelsius;
  fahr.classList.remove("active");
   celsius.classList.add("active");
}
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", checkCelsius);

let tempCelsius= null;

function checkFahr(event) {
  event.preventDefault();

  let tempFahrenheit = document.querySelector("#current-temperature");
  tempFahrenheit.innerHTML = Math.round((tempCelsius * 9) / 5 + 32);
  celsius.classList.remove("active");
  fahr.classList.add("active");
}
let fahr = document.querySelector("#fahr");
fahr.addEventListener("click", checkFahr);


function showDetails(response) {
  
  document.querySelector("#city").innerHTML = response.data.name + `, ` + response.data.sys.country;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#max").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#min").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  document.querySelector("#percieved").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );  
  document.querySelector("#main-icon").setAttribute("src" , `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  tempCelsius = Math.round(
    response.data.main.temp
  );
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML +=`<div class="col-2">
            <p class="card-text">${formatHours(forecast.dt * 1000)}</p>
            <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" width="50px" />
            <p class="details"> ${Math.round(forecast.main.temp_max)}° </br>  ${Math.round(forecast.main.temp_min)}°</p>
          </div>`;
}
}
function searchCity(city) {
  let apiKey = "2abf5cd5bdf12c255e9d60ca40791365";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showDetails);

  let apiLink= `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiLink).then(displayForecast);
}

function cityDefine(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

searchCity("San Francisco");

let form = document.querySelector("#search-form");
form.addEventListener("submit", cityDefine);

function showPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}

function getPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "2abf5cd5bdf12c255e9d60ca40791365";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showDetails);

   let apiLink= `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiLink).then(displayForecast);
  
}
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", showPosition);

