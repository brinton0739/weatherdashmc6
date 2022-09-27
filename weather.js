var beginningDate = moment().format('M/DD/YYYY');
var dayOne  = moment().add(1, 'days').format('M/DD/YYYY');
var dayTwo  = moment().add(2, 'days').format('M/DD/YYYY');
var dayThree  = moment().add(3, 'days').format('M/DD/YYYY');
var dayFour  = moment().add(4, 'days').format('M/DD/YYYY');
var dayFive  = moment().add(5, 'days').format('M/DD/YYYY');


$(document).ready(function() {
   

    // search field on click function

    $("#firstText").on("click", function(e) {
        e.preventDefault();
        var inputCity = $("#search").val() || [];
        var searchedCities= []


        searchedCities = JSON.parse(localStorage.getItem("searchedCities")) || []
        searchedCities.unshift(inputCity);
        localStorage.setItem("searchedCities", JSON.stringify(searchedCities));

        weatherView(inputCity) // running input values after search input goes through the function written next.
    });

   // empty all non local storage before fetching

    weatherView = (inputCity) => {

        $("#dayWeather").empty();
        $("#fiveDay").empty();
        $("#dayOne").empty();
        $("#dayTwo").empty();
        $("#dayThree").empty();
        $("#dayFour").empty();
        $("#dayFive").empty();

        // fetch weathermap.org weather data and hold it in json form

        var dayFetch =`https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&units=imperial&appid=0e41728b55fae7ccb346e270a658fa97`;

        fetch(dayFetch)
        .then((response) => response.json())
        .then((response) => {

            //get weather icons and latitude and longitude based on city searched.

            var iconUrl = `http://openweathermap.org/img/w/${response.weather[0].icon}.png`;
            var lat = response.coord.lat;
            var lon = response.coord.lon;

            // current days weather information appended with interpolation and jquery

            $("#dayWeather").append(

            `<div class ='col s12 m5 text-primary'>
             <h4 class='day'>${response.name}(${beginningDate})&nbsp<img src='${iconUrl}'></h4>     
             <ul class='day'>Temperature: ${response.main.temp} °F</ul>
             <ul class='day'> Humidity: ${response.main.humidity} %</ul>
             <ul class='daily'>Wind Speed: ${response.wind.speed} MPH</ul>
             </div>`
                    
            );

            // pull information for the next 5 days based on lat lon.

            var fiveDay = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=imperial&appid=0e41728b55fae7ccb346e270a658fa97`;
            console.log("fiveDay", fiveDay);


            fetch(fiveDay)
            .then((response) => response.json())
            .then((response) => {
                console.log(response);

                //fill icons for the weather for each of the 5 days.

                var iconurlOne = `http://openweathermap.org/img/w/${response.daily[0].weather[0].icon}.png`;
                var iconurlTwo = `http://openweathermap.org/img/w/${response.daily[1].weather[0].icon}.png`;
                var iconurlThree = `http://openweathermap.org/img/w/${response.daily[2].weather[0].icon}.png`;
                var iconurlFour = `http://openweathermap.org/img/w/${response.daily[3].weather[0].icon}.png`;
                var iconurlFive = `http://openweathermap.org/img/w/${response.daily[4].weather[0].icon}.png`;

                           
                // add coloring to UV Index

                if(response.current.uvi <= 3) {
                    $("uvIndex").addClass("green");
                } else if (response.current.uvi <= 6) {
                    $("uvIndex").addClass("yellow");
                } else if (response.current.uvi <= 8) {
                    $("uvIndex").addClass("orange");
                } else if (response.current.uvi <= 11) {
                    $("uvIndex").addClass("purple");
                };

                //create the daily weather uv index and color code it
                        
                $("#dayWeather").append(
                    `<div class='col s12 m6 text-primary'>
                    <ul class='daily'> UV Index: <button class='w3-button' id='uvIndex' class='daily'> ${response.current.uvi} </button></ul>
                    </div>`
                );

                // Header labeling the 5 day forecast

                $("#fiveDay").append(
                    `<div class ='col-md-12'>
                     <h2 id ='fiveDay'>5-Day Forecast</h2>`
                );

                //each day with moment and each days pertinent fetch data

                $("#dayOne").append(
                    `<div class='card col s12 m4 text-primary'>
                     <div class='card-body'>
                     <div class='card-header'> ${dayOne}</div>
                     <div class='card-text'> <img src="${iconurlOne}"></div>
                     <div class='card-text'> Temp: ${response.daily[0].temp.day} °F</div>
                     <div class='card-text'> Humidity: ${response.daily[0].humidity} %</div>
                     </div>`
                );

                $("#dayTwo").append(
                    `<div class='card col s12 m4 text-primary'>
                    <div class='card-body'>
                    <div class='card-header'> ${dayTwo}</div>
                    <div class='card-text'> <img src="${iconurlTwo}"></div>
                    <div class='card-text'> Temp: ${response.daily[1].temp.day} °F</div>
                    <div class='card-text'> Humidity: ${response.daily[1].humidity} %</div>
                    </div>`
                );

                $("#dayThree").append(
                    `<div class='card col s12 m4 text-primary'>
                    <div class='card-body'>
                    <div class='card-header'> ${dayThree}</div>
                    <div class='card-text'> <img src="${iconurlThree}"></div>
                    <div class='card-text'> Temp: ${response.daily[2].temp.day} °F</div>
                    <div class='card-text'> Humidity: ${response.daily[2].humidity} %</div>
                    </div>`
                );

                $("#dayFour").append(
                    `<div class='card col s12 m5 text-primary'>
                    <div class='card-body'>
                    <div class='card-header'> ${dayFour}</div>
                    <div class='card-text'> <img src="${iconurlFour}"></div>
                    <div class='card-text'> Temp: ${response.daily[3].temp.day} °F</div>
                    <div class='card-text'> Humidity: ${response.daily[3].humidity} %</div>
                    </div>`
                );

                $("#dayFive").append(
                    `<div class='card col s12 m5 text-primary'>
                    <div class='card-body'>
                    <div class='card-header'> ${dayFive}</div>
                    <div class='card-text'> <img src="${iconurlFive}"></div>
                    <div class='card-text'> Temp: ${response.daily[4].temp.day} °F</div>
                    <div class='card-text'> Humidity: ${response.daily[4].humidity} %</div>
                    </div>`
                );
                //function to populate local storage search history created down below.
                cityList();
            })



        })
        .catch((err) => {console.log(err)})
        .finally(() => {console.log("Finally")})
    }



    // create a history button list based on local storage with a limit of 5 and append it in an unordered list

    cityList = () => {

        $("#cityButton").empty();
        var localstorageArray = JSON.parse(localStorage.getItem("searchedCities")) || [];
        

        for(var i = 0; i < 5; i++) {
            var arraycityName = localstorageArray[i];

            $("#cityButton").append (

            `<div class='list-group text-secondary'>
             <button class='list-group-item text-white bg-secondary text-capitalize'> ${arraycityName}
             </button>`
            )
        }
    }

    cityList();

    // limit the search buttons array to 5 and allow click function


    $("#cityButton").on("click",".list-group-item", function(e) {
        e.preventDefault();
        var inputCity = ($(this).text());
        weatherView(inputCity=5);
    })

});
