//Implement the 2 following features, plus the bonus feature if you can 💪:

//⏰Feature #1
//In your project, display the current date and time using JavaScript: Tuesday 16: 00
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayIndex = date.getDay();
  let day = days[dayIndex];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let month = months[date.getMonth()];
  let dates = date.getDate();
  let year = date.getFullYear();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0 ${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0 ${minutes}`;
  }
  let seconds = date.getSeconds();
  if (seconds < 10) {
    seconds = `0 ${seconds}`;
  }

  return `${day}, ${month} ${dates}, ${year} ${hours}:${minutes}:${seconds}`;
}
let now = new Date();
let h2 = document.querySelector("h2");
h2.innerHTML = formatDate(now);

//🕵️‍♀️Feature #2
//Add a search engine, when searching for a city(i.e.Paris), display the city name on the page after the user submits the form.
function displayWeatherCondition(response) {
  //console.log(response);
  // console.log(response.data.name);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#cityTemp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#precipitation").innerHTML = Math.round(
    response.data.clouds.precipitation
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  //document.querySelector("#unit").innerHTML = response.data.;
}

function searchCity(city) {
  let apiKey = "26f23d862451f5a53d3e06afbdf7c6df";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayWeatherCondition);
}

//replaced search name with handleSubmit and moved let apiKey, apiUrl and the axios.
function handleSubmit(event) {
  debugger;
  event.preventDefault();
  // let searchInput = document.querySelector("#cityInput");
  // let h1 = document.querySelector("h1");
  // h1.innerHTML = `${searchInput.value}`;
  // console.log(searchInput);
  //make an API call to Openweather API
  //Once I get the HTTP response, we display the city name and the temperature

  //let cityInput = document.querySelector("#cityInput");
  //let city = cityInput.value
  let city = document.querySelector("#cityInput").value;

  //console.log(apiUrl);
  //console.log(axios);
  searchCity(city);
}

function searchCurrentLocation(position) {
  //console.log(position.coords.latitude);
  // console.log(position.coords.longitude);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "26f23d862451f5a53d3e06afbdf7c6df";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  //console.log(apiUrl);
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayWeatherCondition);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

let form = document.querySelector("#searchForm");
form.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#currentLocationButton");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("sacramento");
//🙀Bonus Feature
//Display a fake temperature(i.e 17) in Celsius and add a link to convert it to Fahrenheit.When clicking on it, it should convert the temperature to Fahrenheit.When clicking on Celsius, it should convert it back to Celsius.

function changeToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#cityTemp");
  temperatureElement.innerHTML = 90;
}
function changeToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#cityTemp");
  temperatureElement.innerHTML = 32;
}
//let fahrenheitTemp = document.querySelector("#fahrenheitLink");
//fahrenheitTemp.addEventListener("click", changeToFahrenheit);

//let celsiusTemp = document.querySelector("#celsiusLink");
//celsiusTemp.addEventListener("click", changeToCelsius);
