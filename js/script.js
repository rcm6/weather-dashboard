//check if local storage exists
if (localStorage.getItem("weatherAppStored") === null) {
  // if null initialise local storage

  var cityList = [ "london", "miami", "here", "there", "when",];

  //set local storage
  localStorage.setItem("weatherAppStored", JSON.stringify(cityList));
}

//create variable to hold local storage array
var retreivedCities = JSON.parse(window.localStorage.getItem("weatherAppStored"));
//console.log(retreivedCities)

//render buttons
for (i = 0; i < retreivedCities.length; i++) {
    //console.log(i)
    var displayCities = (retreivedCities[i]);
    //console.log(displayCities)
  
    //append cities buttons
    $("aside").append(
      ` <p><button class="btn btn-sm btn-primary" data-name ="${displayCities}">${displayCities}
          </button></p>`
    );
  }


  //search weather from button click or search

  $("aside").on("click", function() {
    event.preventDefault()
      var location = ($(this).attr("data-name"));
      //var searchLocation = ($("input").val());

location = "london"

        console.log(location);



    var APIKey = "c90265758d6d690ed02c2c3f3028ca77";
      var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + APIKey;
      
      // ajax call for summary
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
    console.log(response)
    var conTemp = parseFloat(response.main.temp) - 273.15
    // apend today summary div
      $("#today").append(
        `<div><b>${(response.name)}</b></div>
        <div>Temp: ${(conTemp.toFixed(2))}°C</b></div>
        <div>Wind: ${(response.wind.speed)}</div>
        <div>Humidity: ${(response.main.humidity)}</div>`
      );

      var lat = (response.coord.lat);
      var lon = (response.coord.lon);
     

   

    })
      
    })
  

