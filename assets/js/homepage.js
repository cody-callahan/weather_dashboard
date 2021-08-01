// var cityInputEl = document.querySelector("#city");
var cityInputEl = document.querySelector('#submitSearch');
var currentWeatherEl = document.querySelector('#currentWeather');
var currentCityEl = document.querySelector("#currentCity");
var currentTempEl = document.querySelector('#currentTemp');
var currentWindEl = document.querySelector('#currentWind');
var currentHumidEl = document.querySelector('#currentHumid');
var currentUVIEl = document.querySelector('#currentUVI');


var recentlySearchedCities = localStorage.getItem("searchedCities") || []
//this will need a corresponding localStorage.setItem("searchedCities") at the end of your code, which will be an array of userInput values
//in the onclick event, you're going to push to recentlySearchedCities array  and then save the new array to localstorage


var getWeather = function() {
    var userSearchParameter = document.querySelector("#inputCityHere").value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userSearchParameter}&APPID=15e070e69cfccce084f2a07250f5282c`).then(function(response) {
        response.json().then(function(data) {
          console.log(data);
          var lonCoord = data.coord.lon;
          var latCoord = data.coord.lat;

        //   displayTodaysWeather(data);

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latCoord}&lon=${lonCoord}&exclude=minutely,hourly&appid=15e070e69cfccce084f2a07250f5282c`).then(function(response){
            response.json().then(function(data) {
                console.log(data);
                displayTodaysWeather(data);
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

    
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
    today = `(${mm}/${dd}/${yyyy})`;

    currentCityEl.textContent = document.querySelector("#inputCityHere").value + ' ' + today;
};

// event listener to store names of cities  
cityInputEl.addEventListener('click', getWeather);
  

