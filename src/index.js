// Weather update function
function updateWeather(response) {
  const temperatureElement = document.querySelector("#temperature");
  const humidityElement = document.querySelector("#humidity");
  const windSpeedElement = document.querySelector("#wind-speed");
  const timeElement = document.querySelector("#time");
  const iconElement = document.querySelector("#icon");
  const cityElement = document.querySelector("#city");
  const descriptionElement = document.querySelector("#description");

  const temperature = response.data.temperature.current;
  const date = new Date(response.data.time * 1000);

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  timeElement.innerHTML = formalDate(date);

  getForecast(response.data.city);
}

// Format date function
function formalDate(date) {
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = days[date.getDay()];

  return `${day}   ${hours}:${minutes}`;
}

// Search city function
function searchCity(city) {
  const apiKey = "66ao30d4c3f4t8b09259fcd03dac689e";
  const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(updateWeather);
}

// Handle search submit function
function handleSearchSubmit(event) {
  event.preventDefault();
  const searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

// Event listener for search form
const searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

// Default city search
searchCity("Pretoria");

// Forecast function
function getForecast(city) {
  const apiKey = "66ao30d4c3f4t8b09259fcd03dac689e";
  const apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

// Display forecast function
function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.slice(0, 5).forEach((day) => {
    forecastHtml += `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>
        <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}º</strong>
          </div>
          <div class="weather-forecast-temperature">${Math.round(
            day.temperature.minimum
          )}º</div>
        </div>
      </div>
    `;
  });

  const forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

// Format day function
function formatDay(timestamp) {
  const date = new Date(timestamp * 1000);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

// Initial forecast display
getForecast("Malmö");