var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
var requestUrl5Day = "https://api.openweathermap.org/data/2.5/forecast?q=";
var APIKey = "&units=imperial&appid=c2d915cb80a94d6b3b154bb963760e74";
var searchedCity = document.getElementById("searchedCity");
var cityArr = [];
var citySearch = document.getElementById("citySearch");
//onclick

$(".btn").on("click", function (event) {
  event.preventDefault();

  //get weather using api
  saveCity();
  citySearch.value = "";
});

//fetching the API data

function getApi() {
  var cityArrLocal = JSON.parse(localStorage.getItem("city"));

  for (i = 0; i < cityArrLocal.length; i++) {
    var cityAPI = requestUrl + cityArrLocal[i] + APIKey;

    fetch(cityAPI)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      });
  }
  for (i = 0; i < cityArrLocal.length; i++) {
    var forecastAPI = requestUrl5Day + cityArrLocal[i] + APIKey;
    fetch(forecastAPI)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      });
  }
}

function saveCity() {
  var input = document.getElementById("citySearch").value;
  cityArr.push(input);
  console.log(cityArr);
  localStorage.setItem("city", JSON.stringify(cityArr));
  var btn = document.createElement("button");
  btn.innerHTML = input;
  searchedCity.appendChild(btn);
  getApi();
}

//creates button for the city searched

function createBtn() {
  var cityArrLocal = JSON.parse(localStorage.getItem("city"));
  for (i = 0; i < cityArrLocal.length; i++) {
    var btn = document.createElement("button");
    btn.innerHTML = cityArrLocal[i];
    searchedCity.appendChild(btn);
  }
  getApi();
  getApi5Day();
}

createBtn();
