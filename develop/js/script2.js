var apiKey = "b1434cc4b4c38161215a67768fa4f514";
var cityInput = document.querySelector("#cityInputBtn");
var clear = document.querySelector("#clear");
var listCities = document.querySelector("#listCities");
// var currentWeather = document.querySelector("#currentWeather");
var ulEl = document.querySelector("#listCities");

// Image IDs
var img = document.querySelector("#img");
var fImg0 = document.querySelector("#fImg0");
var fImg1 = document.querySelector("#fImg1");
var fImg2 = document.querySelector("#fImg2");
var fImg3 = document.querySelector("#fImg3");
var fImg4 = document.querySelector("#fImg4");

// Temperature IDs
var temp = document.querySelector("#temp");
var fTemp0 = document.querySelector("#fTemp0");
var fTemp1 = document.querySelector("#fTemp1");
var fTemp2 = document.querySelector("#fTemp2");
var fTemp3 = document.querySelector("#fTemp3");
var fTemp4 = document.querySelector("#fTemp4");

// Windspeed IDs
var windSpeed = document.querySelector("#wind-speed");
var fWindSpeed0 = document.querySelector("#fWindSpeed0");
var fWindSpeed1 = document.querySelector("#fWindSpeed1");
var fWindSpeed2 = document.querySelector("#fWindSpeed2");
var fWindSpeed3 = document.querySelector("#fWindSpeed3");
var fWindSpeed4 = document.querySelector("#fWindSpeed4");

// Humidity IDs
var humidity = document.querySelector("#humidity");
var fHumidity0 = document.querySelector("#fHumidity0");
var fHumidity1 = document.querySelector("#fHumidity1");
var fHumidity2 = document.querySelector("#fHumidity2");
var fHumidity3 = document.querySelector("#fHumidity3");
var fHumidity4 = document.querySelector("#fHumidity4");

// Use Moment to determine the current and future data
var currentDate = document.querySelector("#currentDate");
currentDate.textContent = moment().format("l");
var fDate0 = document.querySelector("#fDate0");
fDate0.textContent = moment().add(1, "days").format("l");
var fDate1 = document.querySelector("#fDate1");
fDate1.textContent = moment().add(2, "days").format("l");
var fDate2 = document.querySelector("#fDate2");
fDate2.textContent = moment().add(3, "days").format("l");
var fDate3 = document.querySelector("#fDate3");
fDate3.textContent = moment().add(4, "days").format("l");
var fDate4 = document.querySelector("#fDate4");
fDate4.textContent = moment().add(5, "days").format("l");

// Grab user's input
cityInput.addEventListener("click", function (event) {
  event.preventDefault();

  var userInput = document.getElementById("city").value;

  addCityName(userInput);
  getWeather(userInput);
});

function getWeather(city) {
  var requestUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial&APPID=" +
    apiKey;

  fetch(requestUrl)
    .then(function (response) {
      // console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      var icon = data.weather[0].icon;
      icon.textContent = img;

      humidity.textContent = data.main.humidity + " %";
      temp.textContent = data.main.temp + " F";
      windSpeed.textContent = data.main.wind_speed + " MPH";
      uvIndex.textContent = data.main.uvi;

      // Future temperature
      // Any change for data everything after stops being displayed!!
      fTemp0.textContent = data.main.temp + " F";
      fTemp1.textContent = data.main.temp + " F";
      fTemp2.textContent = data.main.temp + " F";
      fTemp3.textContent = data.main.temp + " F";
      // fTemp4.textContent = data.main.daily[5].temp + " F";

      // Future wind speed
      fWindSpeed0.textContent = data.main.wind + " MPH";
      fWindSpeed1.textContent = data.main.wind + " MPH";
      fWindSpeed2.textContent = data.main.wind + " MPH";
      fWindSpeed3.textContent = data.main.wind + " MPH";
      fWindSpeed4.textContent = data.main.wind + " MPH";

      // Future humidity
      fHumidity0.textContent = data.main.humidity + " %";
      fHumidity1.textContent = data.main.humidity + " %";
      fHumidity2.textContent = data.main.humidity + " %";
      fHumidity3.textContent = data.main.humidity + " %";
      fHumidity4.textContent = data.main.humidity + " %";

      var lat = data.coord.lat;
      var lon = data.coord.lon;

      getUV(lat, lon);
      return data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

getWeather(city);

function getUV(lat, lon) {
  var requestUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&exclude=minutely,hourly" +
    "&units=imperial&appid" +
    apiKey;

  fetch(requestUrl)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {

      uvIndex = document.querySelector("#uv-index");
      uvIndex = response.current.uvi;
      console.log(uvIndex);
      uvIndex.textContent = uvIndex;

      if (uvIndex >= 8) {
        document.getElementById("uvIndex").style("color", "red");
      } else if (uvIndex > 4 && uvIndex < 8) {
        document.getElementById("uvIndex").style("color", "yellow");
      } else {
        document.getElementById("uvIndex").style("color", "green");
      }

      // fTemp0.textContent = data.main.temp + " F";

      return data;
    })
    .catch(function (error) {
      alert("No UV connection");
    });
}

function addCityName(cityName) {
  // var userInput = document.getElementById("city").value;
  console.log(cityName); // -> Dallas

  var tempArr = JSON.parse(localStorage.getItem("allCities"));
  if (tempArr === null) tempArr = [];

  var stored = {
    search: cityName,
  };

  if (!cityName) {
    alert("You must search a city!");
  }

  // Add new data
  tempArr.push(stored);

  // Update the data in localStorage
  localStorage.setItem("allCities", JSON.stringify(tempArr));
}

//Clear the search history and local storage from the page
function clearHistory(event) {
  event.preventDefault();
  stored = [];
  localStorage.clear();
  document.location.reload();
}

clear.addEventListener("click", clearHistory);

function renderSaved() {
  var cities = localStorage.getItem("allCities");
  var printCity = JSON.parse(cities);

  // Creates li for user's city input
  for (var i = 0; printCity.length; i++) {
    var cities = printCity[i].search;
    var liEl = document.createElement("li"); // or button? How to keep them individual?
    liEl.textContent = cities;
    ulEl.appendChild(liEl);
  }
}

renderSaved();
