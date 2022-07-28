const currentWeather = document.querySelector('#currentWeather');
const searchedCities = document.querySelector('#searchedCities')
const userSubmit = document.querySelector('#userSubmit')

var getApi = function() {
  var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=&appid=&appid=b1434cc4b4c38161215a67768fa4f514';

  fetch(requestUrl)
    .then(function (response) {
      console.log(response.status);
      //  Conditional for the the response.status.
      if (response.status !== 200) {
        // Place the response.status on the page.
        searchedCities.textContent = response.status;
        console.log(response)
      }
      return response.json();
    })
    .then(function (data) {
      // Make sure to look at the response in the console and read how 404 response is structured.
      console.log(data);
    });
}

getApi();


// userSubmit.appendChild('#userSubmit')

userSubmit.addEventListener('userSubmit', console.log('click'));
