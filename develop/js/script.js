const currentWeather = document.querySelector('#currentWeather');
const searchedCities = document.querySelector('#searchedCities')
const userSubmit = document.querySelector('#userSubmit')

var getApi = function(city) {
  var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=b1434cc4b4c38161215a67768fa4f514';

  fetch(requestUrl, city)
    .then(function (response) {
      console.log(response.status);
      // If it doesn't connect, return the error code 
      if (response.status !== 200) {
        searchedCities.textContent = response.status;
        console.log(response)
      }
      // Return in json format
      return response.json();
    })
    // Get the data of the API call
    .then(function (data) {
      console.log(data);
      console.log(data.current.weather.description)
    });
}

getApi();

// Find the current weather for the users query
var displayWeather = function (weather) {
  // If the user pushes submit with empty text, alert user
  if (!userSubmit) {
    alert('Please enter a city!');
    return;
  }

  for (let i = 0; i < weather.length; i++) {

    currentWeather.textContent = currentWeather[i];

    currentWeather.appendChild(currentWeather);
    console.log(weather)
  }
};

userSubmit.addEventListener('userSubmit', displayWeather);
