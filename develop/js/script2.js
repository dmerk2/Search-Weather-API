var apiKey = "b1434cc4b4c38161215a67768fa4f514";
var requestUrl =
  "https://api.openweathermap.org/data/2.5/weather?q=" +
  cityArr +
  "&units=imperial&appid=" +
  apiKey;
var cityArr = [];
var cityInput = document.querySelector("#getWeatherBtn");
var searchCityInput = document.querySelector("form");
var clear = document.querySelector("#clear")

// grab reference to the form
cityInput.addEventListener("click", function (event) {
  event.preventDefault();

  var userInput = document.getElementById("city").value;
  console.log(userInput);
  userInput.textContent = city;
  userInput.setAttribute;
  // call our add New City function
  addCityName(userInput);
});

// Taking city searched value

function renderSavedCities() {
  let searchedCity = localStorage.getItem("allCities");
  let printCity = JSON.parse(searchedCity);

  // Print user input append to the previous searches container
  for (let i = 0; i < printCity.length; i++) {
    let cityName = printCity[i];
    console.log(cityName);
    let formEl = document.createElement("button");
    // searchedCity.appendChild(formEl);

    formEl.appendChild(searchedCity);
  }
}

// call your weather API
fetch(requestUrl)
  .then(function (response) {
    if (response) console.log(response.status);
    // If it doesn't connect, return the error code
    if (response.ok !== 200) {
      // searchedCities.textContent = response.status;
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
  .catch(function (error) {
    alert("no connection");
  });

function addCityName(newCity) {
  // Adding dataset to Browser (localStorage)
  localStorage.setItem("newCity", JSON.stringify(cityArr)); // "[]"
  // grab user value from FORM input

  // grab current data from localStorage (getItem)
  var tempArr = JSON.parse(localStorage.getItem("newCity"));
  // convert that data into a JS object (JSON.parse)

  // Add new data
  tempArr.push(newCity);

  // We update the data in localStorage
  localStorage.setItem("newCity", JSON.stringify(tempArr));
}

//Clear the search history from the page
function clearHistory(event){
  event.preventDefault();
  cityArr=[];
  localStorage.removeItem("newCity");
  document.location.reload()
}

clear.addEventListener("click", clearHistory)
