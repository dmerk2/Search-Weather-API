var userFormEl = document.querySelector('#user-form');
var languageButtonsEl = document.querySelector('#language-buttons');
var nameInputEl = document.querySelector('#username');
var cityInput = document.querySelector('#city');
var citySearchTerm = document.querySelector('#repo-search-term');
var apiKey = 'b1434cc4b4c38161215a67768fa4f514';

var weatherAPI = function (requestUrl) {
  var requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=&limit=5&appid=${apiKey}`;
  
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
    return data;
  });
}

weatherAPI();

var formSubmitHandler = function (event) {
  event.preventDefault();
  var event = userFormEl.value();
  event.textContent = userFormEl;
};
var searchBtn = document.querySelector(newFunction());

function newFunction() {
  return '#userSubmit'.value;
}
newFunction()

$(".listItems").on("submit", formSubmitHandler)

var formSubmitHandler = function (event) {
  event.preventDefault();

  var chosenCity = cityInput.value;

  if (chosenCity) {
    userFormEl(chosenCity);

    userFormEl.textContent = listItems;
    nameInputEl.value(chosenCity);
  } else {
    alert('Please enter a GitHub username');
  }
};

var buttonClickHandler = function (event) {
  var language = event.target.getAttribute('data-language');

  if (language) {
    citySearchTerm(language);

    listItems.textContent = '';
  }
};

var getUserRepos = function (_requestUrl, apiUrl) {
  var _requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + apiUrl + '&appid=' + apiKey;

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          displayWeather(data, user);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (_error) {
      alert('Unable to connect to GitHub');
    });
};

var getStoredCities = function (language) {
  var apiUrl = 'https://api.github.com/search/_cityitories?q=' + language + '+is:featured&sort=help-wanted-issues';

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayWeather(data.items, language);
      });
    } else {
      alert('Error: ' + response.statusText);
    }
  });
};

var displayWeather = function (_city, searchTerm) {
  if (_city.length === 0) {
    return;
  }

  repoSearchTerm.textContent = searchTerm;

  for (var i = 0; i < _city.length; i++) {
    var repoName = _city[i].owner.login + '/' + _city[i].name;

    var list = document.createElement('a');
    list.classList = 'list-item flex-row justify-space-between align-center';
    list.setAttribute('href', './single-repo.html?repo=' + repoName);

    var titleEl = document.createElement('span');
    titleEl.textContent = repoName;

    repoEl.appendChild(titleEl);

    var statusEl = document.createElement('span');
    statusEl.classList = 'flex-row align-center';

    if (_city[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" + _city[i].open_issues_count + ' issue(s)';
    } else {
      statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    repoEl.appendChild(statusEl);

    document.querySelector.current-weather-container.appendChild(".list-group");
  }
};

userFormEl.addEventListener('submit', formSubmitHandler);
languageButtonsEl.addEventListener('click', buttonClickHandler);

// var location = localStorage.getItem("location");
var storeWeather = document.querySelector("#getWeather"); 

storeWeather.addEventListener("click", function() {
    localStorage.setItem("storeWeather", storeWeather);
});