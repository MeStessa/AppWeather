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

function checkCelsius(event) {
  event.preventDefault();
  let tempCelsius = document.querySelector("#current-temperature");
  tempCelsius.innerHTML = `+19`;
}
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", checkCelsius);

function checkFahr(event) {
  event.preventDefault();

  let tempFahrenheit = document.querySelector("#current-temperature");
  tempFahrenheit.innerHTML = `  66`;
}
let fahr = document.querySelector("#fahr");
fahr.addEventListener("click", checkFahr);



function showDetails(response) {
  
  document.querySelector("#city").innerHTML = response.data.name;
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

  console.log(response.data);
  document.querySelector("#percieved").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );  
  document.querySelector("#main-icon").setAttribute("src" , `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}


function searchCity(city) {
  let apiKey = "2abf5cd5bdf12c255e9d60ca40791365";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showDetails);
}

function cityDefine(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

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
  
}
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", showPosition);
