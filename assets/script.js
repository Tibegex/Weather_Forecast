var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
var requestUrl5Day = "https://api.openweathermap.org/data/2.5/onecall?lat=";
var APIKey = "&units=imperial&appid=c2d915cb80a94d6b3b154bb963760e74";
var searchedCity = document.getElementById("searchedCity");
var cityArr = [];
var citySearch = document.getElementById("citySearch");
var latLon = "";
var iconFetch = "http://openweathermap.org/img/wn/";
//onclick

$(".btn").on("click", function (event) {
  event.preventDefault();

  //get weather using api
  saveCity();
  citySearch.value = "";
});
$("#searchedCity").on("click", function (event) {
  console.log("working");
  getApi(event.target.innerText);
});
//fetching the API data

function getApi(searchedCity) {
  var cityArrLocal = searchedCity || $("input").val();
  var cityAPI = requestUrl + cityArrLocal + APIKey;
  fetch(cityAPI)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      $(".cityName").text(data.name + " " + moment().format("MM-DD-YY"));
      var latLon = data.coord;

      var forecastAPI =
        requestUrl5Day + latLon.lat + "&lon=" + latLon.lon + APIKey;
      fetch(forecastAPI)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);

          $(".temp").text("Temp: " + data.current.temp + "\u00B0" + "F");
          $(".wind").text("Wind: " + data.current.wind_speed + "mph");
          $(".humidity").text("Humidity: " + data.current.humidity + "%");
          $(".uvIndex").text("UVI: " + data.current.uvi);

          $(".day1 .date").text(
            moment(data.daily[0].dt, "X").format("MM-DD-YY")
          );
          $(".day1 .icon").attr(
            "src",
            iconFetch + data.daily[0].weather[0].icon + ".png"
          );
          $(".day1 .temp").text(
            "Temp: " + data.daily[0].temp.day + "\u00B0" + "F"
          );
          $(".day1 .wind").text("Wind: " + data.daily[0].wind_speed + "mph");
          $(".day1 .humidity").text(
            "Humidity: " + data.daily[0].humidity + "%"
          );

          $(".day2 .date").text(
            moment(data.daily[1].dt, "X").format("MM-DD-YY")
          );
          $(".day2 .icon").attr(
            "src",
            iconFetch + data.daily[1].weather[0].icon + ".png"
          );
          $(".day2 .temp").text(
            "Temp: " + data.daily[1].temp.day + "\u00B0" + "F"
          );
          $(".day2 .wind").text("Wind: " + data.daily[1].wind_speed + "mph");
          $(".day2 .humidity").text(
            "Humidity: " + data.daily[1].humidity + "%"
          );

          $(".day3 .date").text(
            moment(data.daily[2].dt, "X").format("MM-DD-YY")
          );
          $(".day3 .icon").attr(
            "src",
            iconFetch + data.daily[2].weather[0].icon + ".png"
          );
          $(".day3 .temp").text(
            "Temp: " + data.daily[2].temp.day + "\u00B0" + "F"
          );
          $(".day3 .wind").text("Wind: " + data.daily[2].wind_speed + "mph");
          $(".day3 .humidity").text(
            "Humidity: " + data.daily[2].humidity + "%"
          );

          $(".day4 .date").text(
            moment(data.daily[3].dt, "X").format("MM-DD-YY")
          );
          $(".day4 .icon").attr(
            "src",
            iconFetch + data.daily[3].weather[0].icon + ".png"
          );
          $(".day4 .temp").text(
            "Temp: " + data.daily[3].temp.day + "\u00B0" + "F"
          );
          $(".day4 .wind").text("Wind: " + data.daily[3].wind_speed + "mph");
          $(".day4 .humidity").text(
            "Humidity: " + data.daily[3].humidity + "%"
          );

          $(".day5 .date").text(
            moment(data.daily[4].dt, "X").format("MM-DD-YY")
          );
          $(".day5 .icon").attr(
            "src",
            iconFetch + data.daily[4].weather[0].icon + ".png"
          );
          $(".day5 .temp").text(
            "Temp: " + data.daily[4].temp.day + "\u00B0" + "F"
          );
          $(".day5 .wind").text("Wind: " + data.daily[4].wind_speed + "mph");
          $(".day5 .humidity").text(
            "Humidity: " + data.daily[4].humidity + "%"
          );
        });
    });

  //   create5Day();
}

// for (i = 0; i < cityArrLocal.length; i++) {
// for (i = 0; i < cityArrLocal.length; i++) {
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
}

createBtn();
