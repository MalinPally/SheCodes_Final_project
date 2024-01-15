function displayEverything(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  let windElement = document.querySelector("#windElement");
  let humidityElement = document.querySelector("#humidityElement");
  let conditionElement = document.querySelector("#conditionElement");
  let iconElement = document.querySelector("#iconElement");

  let wind = Math.round(response.data.wind.speed);
  let humidity = Math.round(response.data.temperature.humidity);
  let condition = response.data.condition.description;
  let iconUrl = response.data.condition.icon_url;
  let iconDescription = response.data.condition.icon;

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;
  windElement.innerHTML = wind + " km/h";
  humidityElement.innerHTML = humidity + "%";
  conditionElement.innerHTML = condition;

  iconElement.src = iconUrl;
  iconElement.alt = iconDescription;

  let weatherDetails = document.getElementById("weatherDetails");
  weatherDetails.style.display = "block";
}

function fetchDataForDefaultCity() {
  let defaultCity = "Malmö";
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${defaultCity}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayEverything);
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayEverything);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateElement.innerHTML = formatDate(currentDate);
window.addEventListener("load", fetchDataForDefaultCity);
