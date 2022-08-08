var apiKey = "b1434cc4b4c38161215a67768fa4f514";
// var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityArr}&units=imperial&appid=${apiKey}`;
// var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&APPID=" + apiKey;
var cityInput = document.querySelector("#cityInputBtn");
var clear = document.querySelector("#clear");
var temperature = document.querySelector("#temperature");
var humidity = document.querySelector("#humidity");
var windSpeed = document.querySelector("#wind-speed");
var uvIndex = document.querySelector("#uv-index");
var listCities = document.querySelector("#listCities");
var currentWeather = document.querySelector("#currentWeather");
var ulEl = document.querySelector("#listCities");
var currentDate = document.querySelector("#currentDate");

// Use Moment to determine the current and future data
var currentDate = document.querySelector("#currentDate")
currentDate.textContent = moment().format("dddd ll")

var fDate0 = document.querySelector("#fDate0");
fDate0.textContent = moment().add(1, "days").format("dddd")

var fDate1 = document.querySelector("#fDate1");
fDate1.textContent = moment().add(2, "days").format("dddd")

var fDate2 = document.querySelector("#fDate2");
fDate2.textContent = moment().add(3, "days").format("dddd")

var fDate3 = document.querySelector("#fDate3");
fDate3.textContent = moment().add(4, "days").format("dddd")

var fDate4 = document.querySelector("#fDate4");
fDate4.textContent = moment().add(5, "days").format("dddd")

// Grab user's input
cityInput.addEventListener("click", function (event) {
  event.preventDefault();
  addCityName();
});

function addCityName() {
  var userInput = document.getElementById("city").value;
  var tempArr = JSON.parse(localStorage.getItem("allCities"));
  if (tempArr === null) tempArr = [];

  var stored = {
    search: userInput,
  };

  if (!userInput) {
    alert("You must search a city!");
  }
  // // Add new data
  localStorage.setItem("stored", JSON.stringify(stored));
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

function getWeather(city) {
  var requestUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial&APPID=" +
    apiKey;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      currentWeather.textContent = response.name;
      console.log(response.name);
      return data;
    })
    .catch(function (error) {
      alert("No Connection");
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
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      return data;
    })
    .catch(function (error) {
      alert("No UV connection")
    });
}

getUV(lat, lon)