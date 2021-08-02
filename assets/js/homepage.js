// var cityInputEl = document.querySelector("#city");
var cityInputEl = document.querySelector('#submitSearch');
var recentCitiesEl = document.querySelector('#recentCities');

var currentWeatherEl = document.querySelector('#currentWeather');

var currentCityEl = document.querySelector("#currentCity");
var currentTempEl = document.querySelector('#currentTemp');
var currentWindEl = document.querySelector('#currentWind');
var currentHumidEl = document.querySelector('#currentHumid');
var currentUVIEl = document.querySelector('#currentUVI');

var fiveDayForecastEl = document.querySelector('#fiveDayForecast');

// document.querySelector('#fiveDayForecast').children.length
// var searchedCity = document.querySelector("#inputCityHere").value;

var recentlySearchedCities = JSON.parse(localStorage.getItem("cities")) || []
//this will need a corresponding localStorage.setItem("searchedCities") at the end of your code, which will be an array of userInput values
//in the onclick event, you're going to push to recentlySearchedCities array  and then save the new array to localstorage

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

dateToday = mm + '/' + dd + '/' + yyyy;


var getWeatherNew = function() {
    getWeather(document.querySelector("#inputCityHere").value)
}

var getWeatherOld = function(event) {
    getWeather(event.target.textContent)
}


var getWeather = function(city) {
    var userSearchParameter = city

    currentCityEl.textContent = userSearchParameter + ' (' + dateToday + ')';

    console.log(userSearchParameter);

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userSearchParameter}&APPID=15e070e69cfccce084f2a07250f5282c`).then(function(response) {
        response.json().then(function(data) {
          console.log(data);
          var lonCoord = data.coord.lon;
          var latCoord = data.coord.lat;


          // load into memory
          console.log({recentlySearchedCities,userSearchParameter})
            recentlySearchedCities.push(userSearchParameter);
        
            localStorage.setItem('cities', JSON.stringify(recentlySearchedCities));
            console.log(recentlySearchedCities);

            updateRecentSearches();

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latCoord}&lon=${lonCoord}&exclude=minutely,hourly&appid=15e070e69cfccce084f2a07250f5282c`).then(function(response){
            response.json().then(function(data) {
                console.log(new Date(data.daily[0].dt * 1000));
                displayTodaysWeather(data);
                console.log(data);
                displayFutureWeather(data);
        });


        });
      });
})};


// var getWeather = function(event) {
//     console.log(event.target.textContent);
//     var userSearchParameter = document.querySelector("#inputCityHere").value;
//     console.log(userSearchParameter);

//     ;

//     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userSearchParameter}&APPID=15e070e69cfccce084f2a07250f5282c`).then(function(response) {
//         response.json().then(function(data) {
//           console.log(data);
//           var lonCoord = data.coord.lon;
//           var latCoord = data.coord.lat;
//             console.log(localStorage['cities'])


//           // load into memory
//           console.log({recentlySearchedCities,userSearchParameter})
//             recentlySearchedCities.push(userSearchParameter);
        
//             localStorage.setItem('cities', JSON.stringify(recentlySearchedCities));
//             console.log(recentlySearchedCities);

//             updateRecentSearches();

//         fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latCoord}&lon=${lonCoord}&exclude=minutely,hourly&appid=15e070e69cfccce084f2a07250f5282c`).then(function(response){
//             response.json().then(function(data) {
//                 console.log(new Date(data.daily[0].dt * 1000));
//                 displayTodaysWeather(data);
//                 console.log(data);
//                 displayFutureWeather(data);
//         });


//         });
//       });
// })};


var getOldWeather = function(event) {
    console.log(event.target.textContent);
    var userSearchParameter = event.target.textContent;
    console.log(userSearchParameter);


    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userSearchParameter}&APPID=15e070e69cfccce084f2a07250f5282c`).then(function(response) {
        response.json().then(function(data) {
          console.log(data);
          var lonCoord = data.coord.lon;
          var latCoord = data.coord.lat;
            console.log(localStorage['cities'])


          // load into memory
        //   console.log({recentlySearchedCities,userSearchParameter})
        //     recentlySearchedCities.push(userSearchParameter);
        
        //     localStorage.setItem('cities', JSON.stringify(recentlySearchedCities));
        //     console.log(recentlySearchedCities);

            // updateRecentSearches();

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latCoord}&lon=${lonCoord}&exclude=minutely,hourly&appid=15e070e69cfccce084f2a07250f5282c`).then(function(response){
            response.json().then(function(data) {
                console.log(new Date(data.daily[0].dt * 1000));
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

    // currentCityEl.textContent = document.querySelector("#inputCityHere").value + ' (' + dateToday + ')';
};


var displayFutureWeather = function(cityData) {
    fiveDayForecastEl.classList.remove("hide");
    for (var i = 0; i < fiveDayForecastEl.children.length; i++) {

        dd = String(today.getDate()+1+i).padStart(2, '0');
        fiveDayForecastEl.children[i].children[0].textContent = `${mm}/${dd}/${yyyy}`;
        
        fiveDayForecastEl.children[i].children[1].textContent = `Temp: ${cityData.daily[i].temp.day}`;
        fiveDayForecastEl.children[i].children[2].textContent = `Wind: ${cityData.daily[i].wind_speed}`;
        fiveDayForecastEl.children[i].children[3].textContent = `Humidity: ${cityData.daily[i].humidity}`;

        fiveDayForecastEl.children[i].children[4].src = `http://openweathermap.org/img/wn/${cityData.daily[i].weather[0].icon}.png`;


    }
};


var updateRecentSearches = function() {
    
    if(recentCitiesEl.childElementCount < 6) {
        recentCitiesEl.innerHTML = ''
        for (let i = recentlySearchedCities.length - 1; i >= 0; i--) {
            var recentCityButton = document.createElement("button");
            recentCityButton.textContent = recentlySearchedCities[i];
            recentCityButton.addEventListener('click',getWeatherOld);
            recentCityButton.classList.add("col-12");
            recentCitiesEl.appendChild(recentCityButton);
        }
    } else { 
        recentCitiesEl.innerHTML = '';
        for (let i = recentlySearchedCities.length - 1; i >= recentlySearchedCities.length - 6; i--) {
        var recentCityButton = document.createElement("button");
        recentCityButton.textContent = recentlySearchedCities[i];
        recentCityButton.addEventListener('click',getWeatherOld);
        recentCitiesEl.appendChild(recentCityButton);
    } 
}
};

// event listener to store names of cities  
cityInputEl.addEventListener('click', getWeatherNew);
  
