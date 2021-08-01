// var cityInputEl = document.querySelector("#city");
var cityInputEl = document.querySelector('#submitSearch');
var currentWeatherEl = document.querySelector('#currentWeather');
var recentCitiesEl = document.querySelector('#recentCities');

var currentCityEl = document.querySelector("#currentCity");
var currentTempEl = document.querySelector('#currentTemp');
var currentWindEl = document.querySelector('#currentWind');
var currentHumidEl = document.querySelector('#currentHumid');
var currentUVIEl = document.querySelector('#currentUVI');

var fiveDayForecastEl = document.querySelector('#fiveDayForecast');

// document.querySelector('#fiveDayForecast').children.length


var recentlySearchedCities = localStorage.getItem("searchedCities") || []
//this will need a corresponding localStorage.setItem("searchedCities") at the end of your code, which will be an array of userInput values
//in the onclick event, you're going to push to recentlySearchedCities array  and then save the new array to localstorage

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

dateToday = `${mm}/${dd}/${yyyy}`;


var getWeather = function() {
    var userSearchParameter = document.querySelector("#inputCityHere").value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userSearchParameter}&APPID=15e070e69cfccce084f2a07250f5282c`).then(function(response) {
        response.json().then(function(data) {
          console.log(data);
          var lonCoord = data.coord.lon;
          var latCoord = data.coord.lat;

          // load into memory
        if (localStorage['cities']) {
            var cities = [localStorage['cities']];
            // add the cities to the array
            cities.push(document.querySelector("#inputCityHere").value);
            // save to local storage
            localStorage["cities"] = cities;
            updateRecentSearches();
        } else {
            localStorage.setItem('cities', document.querySelector("#inputCityHere").value);
        };

        


        //   displayTodaysWeather(data);

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latCoord}&lon=${lonCoord}&exclude=minutely,hourly&appid=15e070e69cfccce084f2a07250f5282c`).then(function(response){
            response.json().then(function(data) {
                displayTodaysWeather(data);
                console.log(data);
                displayFutureWeather(data);
        });


        });
      });
})};

var displayTodaysWeather = function(cityData) {
    var cityTemp = cityData.current.temp;
    var cityWind = cityData.current.wind_speed;
    var cityHumid = cityData.current.humidity;
    var cityUVI = cityData.current.uvi;
    console.log(cityTemp, cityWind, cityHumid);

    currentWeatherEl.classList.remove("hide");

    

    currentTempEl.textContent = `Temp: ${cityTemp}`;
    currentWindEl.textContent = `Wind: ${cityWind} MPH`;
    currentHumidEl.textContent = `Humidity: ${cityHumid} %`;
    currentUVIEl.textContent = `UVI Index: ${cityUVI}`;

    currentCityEl.textContent = document.querySelector("#inputCityHere").value + ' (' + dateToday + ')';
};


var displayFutureWeather = function(cityData) {
    fiveDayForecastEl.classList.remove("hide");
    for (var i = 0; i < fiveDayForecastEl.children.length; i++) {

        dd = String(today.getDate()+1+i).padStart(2, '0');
        fiveDayForecastEl.children[i].children[0].textContent = `${mm}/${dd}/${yyyy}`;
        
        fiveDayForecastEl.children[i].children[1].textContent = `Temp: ${cityData.daily[i].temp.day}`;
        fiveDayForecastEl.children[i].children[2].textContent = `Wind: ${cityData.daily[i].wind_speed}`;
        fiveDayForecastEl.children[i].children[3].textContent = `Humidity: ${cityData.daily[i].humidity}`;
    }
};


var updateRecentSearches = function() {
    recentCitiesEl.textContent = localStorage['cities']
}

// event listener to store names of cities  
cityInputEl.addEventListener('click', getWeather);
  

