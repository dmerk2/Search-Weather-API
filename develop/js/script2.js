var apiKey = "b1434cc4b4c38161215a67768fa4f514";
// var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityArr}&units=imperial&appid=${apiKey}`;
var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${apiKey}`;
var cityArr = [];
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

currentDate = moment().format("MMMM Do YYYY, h:mm:ss a");

// grab reference to the form
cityInput.addEventListener("click", function (event) {
  event.preventDefault();
  addCityName();
});

fetch(requestUrl)
  .then(function (response) {
    if (response) console.log(response.status);
    // If it doesn't connect, return the error code
    if (response.ok !== 200) {
      currentWeather.textContent = response.status;
      return response;
    }
    // Return in json format
    return response.json();
  })
  // Get the data of the API call
  .then(function (data) {
    console.log(data);
    return data;
  })
  // Use catch if then statements don't succeed
  .catch(function (error) {
    alert("no connection");
  });

function addCityName() {
  var userInput = document.getElementById("city").value;
  var tempArr = JSON.parse(localStorage.getItem("allCities"));
  if (tempArr === null) tempArr = [];

  var stored = {
    search: userInput,
  };
  // // Add new data
  localStorage.setItem("stored", JSON.stringify(stored));
  tempArr.push(stored);

  // We update the data in localStorage
  localStorage.setItem("allCities", JSON.stringify(tempArr));
}



//Clear the search history from the page
function clearHistory(event) {
  event.preventDefault();
  cityArr = [];
  localStorage.removeItem("newCity");
  document.location.reload();
}

clear.addEventListener("click", clearHistory);
function renderSaved() {
  var cities = localStorage.getItem("allCities");
  var printCity = JSON.parse(cities);

  // Creates li for user's city input
  for (var i = 0; printCity.length; i++) {
    var cities = printCity[i].search;
    var liEl = document.createElement("li");
    liEl.textContent = cities;
    ulEl.appendChild(liEl);
  }
}

renderSaved();