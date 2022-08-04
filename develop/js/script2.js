var apiKey = "b1434cc4b4c38161215a67768fa4f514";

var requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=&limit=5&appid=${apiKey}`;


// Example Dataset
var cityArr = [];
// Adding dataset to Browser (localStorage)
localStorage.setItem("allCities", JSON.stringify(cityArr));  // "[]"
// grab reference to the form
var cityInput = document.getElementById('getWeatherBtn');


cityInput.addEventListener("click", function(event) {
  event.preventDefault();

  var userInput = document.getElementById("city").value;
  console.log(userInput)

  // call our add New City function
  addCityName(userInput);

  // call your weather API 
});


fetch(requestUrl)
  .then(function (response) {
    console.log(response.status);
    // If it doesn't connect, return the error code
    if (response.status !== 200) {
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
  });
  
// Fix URL to get city data and add city as var

// Taking city searched value
// var searchCityInput = document.querySelector("form").value = "Working";


var searchCityInput = document.querySelector("form")
/*
var getWeatherBtn = document.querySelector("#getWeatherBtn").addEventListener("click",function(event){
  event.preventDefault()

  // catupter the user input from FORM

})
*/

// function renderSavedCities() {
//   let searchedCity = localStorage.getItem("searchedCity"); // JSON OBJECT  "[ "{ "name": "tom" }" , "bill", "sarah"]"
//   let printCity = JSON.parse(searchedCity);  // this will be a regular JS object 
//   // example  of object KEY : VALUE pair
//   // ex --> var ArrayObjs = [{ name: "billy" }, { name: "sarah"}]
//   // aaray --> ["Austin", "detroit"]
//   console.log(printCity);

//   for (let i = 0; printCity.length; i++) {
//     // we need to grab the name (VALUE) at each index
//     // var cityName = 

//     // 
//   }
// }

function renderSavedCities() {
  let searchedCity = localStorage.getItem("allCities");
  let printCity = JSON.parse(searchedCity)
  for (let i = 0; i < printCity.length; i++) {
    let cityName = printCity[i];
    console.log(cityName);
    let liEL = document.createElement("button");
    searchedCity.appendChild(liEL);
    
    liEL.appendChild(searchedCity)
    liEL.innerHTML = searchCityInput
  }

}

function addCityName(newCity) {
  // grab user value from FORM input
  // var newData = "Austin";

  // grab current data from localStorage (getItem)
  var tempArr = JSON.parse(localStorage.getItem("allCites"));
  // convert that data into a JS object (JSON.parse)
  
  // Add new data
  tempArr.push(newCity);
  // We need to convert that JS object into a JSON (string) object

  // We update the data in localStorage
  localStorage.setItem("allCities", JSON.stringify(tempArr));
}
renderSavedCities()
