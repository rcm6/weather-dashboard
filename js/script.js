// function that displays the current day using moment
function displayTime() {
    currentDate = moment().format("dddd, Do MMMM");
  }
  setInterval(displayTime, 1000);

//check if local storage exists
if (localStorage.getItem("weatherAppStored") === null) {
  // if null initialise local storage

  var cityList = [];

  //set local storage
  localStorage.setItem("weatherAppStored", JSON.stringify(cityList));
}

//create variable to hold local storage array
var retreivedCities = JSON.parse(window.localStorage.getItem("weatherAppStored"));
//console.log(retreivedCities)

//call render buttons function
renderButtons();

//Function render buttons
function renderButtons() {

  for (i = 0; i < retreivedCities.length; i++) {
    console.log(i)
    var displayCities = (retreivedCities[i]/*.City*/);
    console.log(displayCities)
  
    //append cities buttons
    $("aside").append(
      ` <p><button class="btn btn-sm btn-primary" data-name ="${displayCities}">${displayCities}
          </button></p>`
    );
  }
  
}


  //search weather from button click or search

  $("aside").on("click", "button", function() {
    event.preventDefault()
      var location = ($(this).attr("data-name"));
      var searchLocation = ($("input").val());

if (searchLocation != "") {

location=searchLocation;
//clear input value
$("input").val("");

//append search location to array/local storage
retreivedCities.push(location);
console.log(retreivedCities.length)
// shift array to remove first item if greater than 5

if ((retreivedCities.length) > 5) {
  retreivedCities.shift();

}

//update local storage
  localStorage.setItem("weatherAppStored", JSON.stringify(retreivedCities))

//clear aside
$('aside').find('p').remove()
//call render buttons function
renderButtons();

} else if (typeof location == 'undefined') { 
errorTrap();
return false;
}
//end if

//clear previous displays
$("#today").empty("");
$("#forecast").empty("");

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
        `<div><b>${(response.name)} - ${(currentDate)}</b></div>
        <div>Temp: ${(conTemp.toFixed(2))}°C</b></div>
        <div>Wind: ${(response.wind.speed)}</div>
        <div>Humidity: ${(response.main.humidity)}</div>`
      );

      var lat = (response.coord.lat);
      var lon = (response.coord.lon);
      var queryURL5 = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;

      // ajax call for 5day
      $.ajax({
        url: queryURL5,
        method: "GET"
      }).then(function(response) {
    console.log(response)
    

    //loop through 5 days increments of 8?

    $("#forecast").append(
      `<div class="col-12">
      <h4>5 Day Forecast</h4>
    </div>`
    );

for (let index = 5; index < 40; index = index+8) {
//const element = array[index];

var conTemp = parseFloat(response.list[index].main.temp) - 273.15

$("#forecast").append(
  `<div class="card bg-dark text-white" style="width: 10rem; margin-left:3px;">
  <div class="card-body">
    <h5 class="card-title">${(response.city.name)}</h5>
    <p class="card-text">${moment((response.list[index].dt_txt)).format("dddd, Do MMMM")}</p>
    <p class="card-text"><img src="http://openweathermap.org/img/wn/${(response.list[index].weather[0].icon)}@2x.png" </img</p>
    <p class="card-text">Temp: ${(conTemp.toFixed(2))}°C</p>
    <p class="card-text">Wind: ${(response.list[index].wind.speed)}</p>
    <p class="card-text">Humidity: ${(response.list[index].main.humidity)}</p>
  </div>
</div>`
);

}
//end for loop   

   

    })
      
    })
  })
     

  function errorTrap() {
    console.log("there was an error")
    
    $("#today").prepend(
    `<div class="alert alert-warning"><b>Please enter a city name in the search box</b></div>`
    );
    
      }
  

