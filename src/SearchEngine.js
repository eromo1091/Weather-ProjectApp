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
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let seconds = date.getSeconds();
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${day}, ${month} ${dates}, ${year} ${hours}:${minutes}:${seconds}`;
}

let now = new Date();
let h2 = document.querySelector("h2");
h2.innerHTML = formatDate(now);

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#cityTemp").innerHTML = Math.round(
    celsiusTemperature
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
  document
    .querySelector("#temp-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#temp-icon")
    .setAttribute("alt", response.data.weather[0].description);
}

function displayForeast(response) {
  console.log(response.data);
  let;
}

function searchCity(city) {
  let apiKey = "26f23d862451f5a53d3e06afbdf7c6df";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayWeatherCondition);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityname},${statecode},${countrycode}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForeast);
}

function handleSubmit(event) {
  debugger;
  event.preventDefault();
  let city = document.querySelector("#cityInput").value;

  searchCity(city);
}

function searchCurrentLocation(position) {
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

//🙀Bonus Feature
//Display a fake temperature(i.e 17) in Celsius and add a link to convert it to Fahrenheit.When clicking on it, it should convert the temperature to Fahrenheit.When clicking on Celsius, it should convert it back to Celsius.

function changeToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#cityTemp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
function changeToCelsius(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temperatureElement = document.querySelector("#cityTemp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheitLink");
fahrenheitLink.addEventListener("click", changeToFahrenheit);

let celsiusLink = document.querySelector("#celsiusLink");
celsiusLink.addEventListener("click", changeToCelsius);

searchCity(city);
