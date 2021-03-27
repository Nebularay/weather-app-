let now = new Date();
let currentDate = document.querySelector("#current-date");
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes("mm");
if (minutes < 10) {
  minutes = `0${minutes}`;
}
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

currentDate.innerHTML = `${day}, ${hours}:${minutes}`;

function formatHours(timestamp) {
  
  let forecastDate = new Date(timestamp);
  let hours = forecastDate.getHours();
  if (hours < 10) {
  hours = `0${hours}`;
  }
  let minutes = forecastDate.getMinutes("mm");
  if (minutes < 10) {
  minutes = `0${minutes}`;
  }

  return `${hours}: ${minutes}`;
  
}

function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#top-temperature").innerHTML = Math.round(response.data.main.temp
    
  );
  
  let iconElement = document.querySelector ("#main-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed
  );
  
  document.querySelector("#description").innerHTML = response.data.weather[0].main;

  document.querySelector("#min-temp").innerHTML = Math.round(response.data.main.temp_min);
  document.querySelector("#max-temp").innerHTML = Math.round(response.data.main.temp_max);
  
}

function showForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = null;
  forecastElement.innerHTML = ``;



  for (let index = 0; index < 6; index ++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col">
        <div class = "card-time" style="width: 6rem;">
         ${formatHours(forecast.dt *1000)}
        </div>
        <div class="card-one" style="width: 6rem;">
          <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png">
          <div class="card-body-two">
          </div>
        </div>
        <div class="card-details-one" style="width: 6rem;">
          <ul class="list-group list-group-flush">
          <li class="sec-temperature">${Math.round(forecast.main.temp_max)}°C / ${Math.round(forecast.main.temp_min)}°C </li>
          </ul>
        </div>
        <br/> 
    </div>
  `;  

    
  

  // for (let index = 0; index < 6; index = ++) {
  //   forecast = response.data.list[index];
  //   forecastElement.innerHTML += `
  //   <div class="col">
  //       <div class="card-two" style="width: 6rem;">
  //         <p>
  //           ${formatHours(forecast.dt *1000)}
  //         </p>
  //         <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png">
  //         <div class="card-body-two">
  //         </div>
  //       </div>
  //       <div class="card-details-two" style="width: 6rem;">
  //         <ul class="list-group list-group-flush">
  //         <li class="sec-temperature">${Math.round(forecast.main.temp_max)}°C / ${Math.round(forecast.main.temp_min)}°C </li>
  //         </ul>
  //       </div>
  //   </div>
  // `;  

  }

  

  // forecast = response.data.list[2];
  // forecastElement.innerHTML += `
  //   <div class="col">
  //       <div class="card-two" style="width: 6rem;">
  //         <p>
  //           ${formatHours(forecast.dt *1000)}
  //         </p>
  //         <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png">
  //         <div class="card-body-two">
  //         </div>
  //       </div>
  //       <div class="card-details-two" style="width: 6rem;">
  //         <ul class="list-group list-group-flush">
  //         <li class="sec-temperature">${Math.round(forecast.main.temp_max)}°C / ${Math.round(forecast.main.temp_min)}°C </li>
  //         </ul>
  //       </div>
  //   </div>
  // `;  

  // forecast = response.data.list[3];
  // forecastElement.innerHTML += `
  //   <div class="col">
  //       <div class="card-two" style="width: 6rem;">
  //         <p>
  //           ${formatHours(forecast.dt *1000)}
  //         </p>
  //         <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png">
  //         <div class="card-body-two">
  //         </div>
  //       </div>
  //       <div class="card-details-two" style="width: 6rem;">
  //         <ul class="list-group list-group-flush">
  //         <li class="sec-temperature">${Math.round(forecast.main.temp_max)}°C / ${Math.round(forecast.main.temp_min)}°C </li>
  //         </ul>
  //       </div>
  //   </div>
  // `;  

  // forecast = response.data.list[4];
  // forecastElement.innerHTML += `
  //   <div class="col">
  //       <div class="card-two" style="width: 6rem;">
  //         <p>
  //           ${formatHours(forecast.dt *1000)}
  //         </p>
  //         <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png">
  //         <div class="card-body-two">
  //         </div>
  //       </div>
  //       <div class="card-details-two" style="width: 6rem;">
  //         <ul class="list-group list-group-flush">
  //         <li class="sec-temperature">${Math.round(forecast.main.temp_max)}°C / ${Math.round(forecast.main.temp_min)}°C </li>
  //         </ul>
  //       </div>
  //   </div>
  // `;  

}


function search(city){
  let apiKey = "d2b10ca1f78d20c42dc47e5254cff8b1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);

}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
  
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#top-temperature");
  temperatureElement.innerHTML = 50;
}

function convertToCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#top-temperature");
  temperatureElement.innerHTML = 10;
}


let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", convertToCelcius);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

search("Utrecht");



