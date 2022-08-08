var apiKey = "b1434cc4b4c38161215a67768fa4f514";
// var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityArr}&units=imperial&appid=${apiKey}`;
// var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${apiKey}`
var cityArr = [];
var cityInput = document.querySelector("#getWeatherBtn");
var searchCityInput = document.querySelector("form");
var clear = document.querySelector("#clear");
var temperature = document.querySelector("#temperature");
var humidity = document.querySelector("#humidity");
var windSpeed = document.querySelector("#wind-speed");
var uvIndex = document.querySelector("#uv-index");
var listCities = document.querySelector("#listCities");
var currentWeather = document.querySelector("#currentWeather");

// grab reference to the form
cityInput.addEventListener("click", function (event) {
  event.preventDefault();

  var userInput = document.getElementById("city").value;
  console.log(userInput);
  userInput.textContent = currentWeather;
  addCityName(userInput);
});

// function renderSavedCities() {
//   let searchedCity = localStorage.getItem("allCities");
//   let printCity = JSON.parse(searchedCity);

//   // Print user input append to the previous searches container
//   for (let i = 0; i < printCity.length; i++) {
//     let cityName = printCity[i];
//     console.log(cityName);
//     let formEl = document.createElement("button");
//     formEl.appendChild(previousSearches);
//   }
// }

fetch(requestUrl)
  .then(function (response) {
    if (response) console.log(response.status);
    // If it doesn't connect, return the error code
    if (response.ok !== 200) {
      searchedCities.textContent = response.status;
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

function addCityName(newCity) {
  // Adding dataset to Browser (localStorage)
  localStorage.setItem("newCity", JSON.stringify(cityArr)); // "[]"
  // grab current data from localStorage (getItem)
  var tempArr = JSON.parse(localStorage.getItem("newCity"));
  // Add new data
  tempArr.push(newCity);
  // We update the data in localStorage
  localStorage.setItem("newCity", JSON.stringify(tempArr));
}

//Clear the search history from the page
function clearHistory(event) {
  event.preventDefault();
  cityArr = [];
  localStorage.removeItem("newCity");
  document.location.reload();
}

clear.addEventListener("click", clearHistory);
