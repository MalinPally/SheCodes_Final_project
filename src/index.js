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

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();
}

  function displayForecast(){
    function displayForecast() {
    let forecastElement = document.querySelector("#forecast");
    let forecast = document.querySelector("#forecast");
    let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
    let forecastHtml = "";
    }

    days.forEach(function (day) {
         forecastHtml =
         forecastHtml +
         `
          <div class="weather-forecast" id="forecast">
            <div class="weather-forecast-day">
            <div class="weather-forecast-date">${day}</div>
            <div class="weather-forecast-icon">☁️</div>
              <div class="weather-forecast-temperatures">
              <div class="weather-forecast-temperature-max">
               <strong>15°</strong>
              </div>
              <div class="weather-forecast-temperature-min">9°</div>
            </div>
          </div>
        `;
    });

    forecastElement.innerHTML = forecastHtml;

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
