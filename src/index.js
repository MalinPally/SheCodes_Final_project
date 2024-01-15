function displayEverything(response) {
  try {
    console.log(response.data);

    const { city, temperature, wind, condition } = response.data;

    if (!city || !temperature || !wind || !condition) {
      throw new Error("Invalid API response structure");
    }

    let temperatureElement = document.querySelector("#current-temperature");
    let cityElement = document.querySelector("#current-city");
    let windElement = document.querySelector("#windElement");
    let humidityElement = document.querySelector("#humidityElement");
    let conditionElement = document.querySelector("#conditionElement");
    let iconElement = document.querySelector("#iconElement");

    let temperatureValue = Math.round(temperature.current);
    let windSpeed = Math.round(wind.speed);
    let humidity = temperature.humidity;
    let conditionDescription = condition.description;
    let iconUrl = condition.icon_url;
    let iconDescription = condition.icon;

    cityElement.innerHTML = city;
    temperatureElement.innerHTML = temperatureValue;
    windElement.innerHTML = windSpeed + " km/h";
    humidityElement.innerHTML = humidity + "%";
    conditionElement.innerHTML = conditionDescription;

    iconElement.src = iconUrl;
    iconElement.alt = iconDescription;

    let weatherDetails = document.getElementById("weatherDetails");
    weatherDetails.style.display = "block";

    getForecast(city);
  } catch (error) {
    console.error("Error in displayEverything:", error.message);
  }
}

function fetchDataForDefaultCity() {
  let defaultCity = "Malmö";
  let apiKey = "66ao30d4c3f4t8b09259fcd03dac689e";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${defaultCity}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayEverything);
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;
  let apiKey = "66ao30d4c3f4t8b09259fcd03dac689e";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayEverything);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
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
        </div>`;
    }
  });

  forecastElement.innerHTML = forecastHtml;
}

function getForecast(city) {
  let apiKey = "66ao30d4c3f4t8b09259fcd03dac689e";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;

  axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days[date.getDay()];
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let cityElement = document.querySelector("#current-city");

  cityElement.innerHTML = searchInput.value;
  search(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateElement.innerHTML = formatDate(currentDate);

window.addEventListener("load", fetchDataForDefaultCity);
