var startDate = moment().format('M/DD/YYYY');


$(document).ready(function () {
    console.log("ready!");

    $("#basic-text1").on("click", function(event) {
        event.preventDefault();
        var cityInput = $("#input").val(); 
        var allCities = []; 

        allCities = JSON.parse(localStorage.getItem("allCities")) || []; 
        allCities.push(cityInput); 
        localStorage.setItem("allCities", JSON.stringify(allCities)); 

        showWeather(cityInput);
    });

    function showWeather(cityInput) {

        var oneDay = "https://api.openweathermap.org/data/2.5/weather?q="
            + cityInput + "&units=imperial" + "&appid=9fb172be3ff75735ceac4ebea2c45bbc";
        console.log("oneDay", oneDay);

        $.ajax({
            url: oneDay,
            method: "GET",
        }).then(function (response) {

            var iconUrl = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
            var lat = response.coord.lat;
            var lon = response.coord.lon;

            $("#dailyWeather").append(
                "<div class='col s12 m6'>"
                + "<h2 class='daily'>" + response.name + " (" + startDate + ")" + "&nbsp" + "<img src='" + iconUrl + "'>" + "</h2>"
                + "<ul class='daily'>" + "Temperature: " + response.main.temp + " °F" + "</ul>"
                + "<ul class='daily'>" + "Humidity: " + response.main.humidity + "%" + "</ul>"
                + "<ul class='daily'>" + "Wind Speed: " + response.wind.speed + " MPH" + "</ul>"
                + "</div>"
            );
        })
    }

    function showCities() {
        $("#cityButtons").empty();
        var arrayFromStorage = JSON.parse(localStorage.getItem("allCities")) || [];
        var arrayLength = arrayFromStorage.length;

        for (var i = 0; i < arrayLength; i++) {
            var cityNameFromArray = arrayFromStorage[i];

            $("#cityButtons").append(
                "<div class='list-group'>"
                + "<button class='list-group-item'>" + cityNameFromArray
                + "</button>")
        }
    }

    showCities();

});