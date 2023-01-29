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

//initialise variable to hold local storage array
var retreivedCities = JSON.parse(window.localStorage.getItem("weatherAppStored"));
console.log(retreivedCities)
console.log(retreivedCities.length)

//if array holds a location call render buttons function
if (retreivedCities.length > 0) {
renderButtons();
}

//Function render buttons----------------------------------------------------
function renderButtons() {
  $("aside").append(`<h3>Search history</h3>`);


  for (i = 0; i < retreivedCities.length; i++) {
    console.log(i);
    var displayCities = retreivedCities[i] /*.City*/;
    console.log(displayCities);

    //append cities buttons
    $("aside").append(
      ` <p><button class="btn btn-lg btn-block btn-primary" data-name ="${displayCities}">${displayCities}
          </button></p>`
    );
  }
}
//Function render buttons end------------------------------------------------

// Search -------------------------------------------------------------------
//search weather from button click or search
$("aside").on("click", "button", function () {
  event.preventDefault();
  locationS = $(this).attr("data-name");
  searchLocation = $("input").val();

  //clear previous displays
  $("#today").empty("");
  $("#forecast").empty("");

  // create api key and url

  if (searchLocation != "") {
    locationS = searchLocation;
  }

  APIKey = "c90265758d6d690ed02c2c3f3028ca77";
    queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      locationS +
      "&appid=" +
      APIKey;

  //if search location is not empty - set variable/clear input/update array (append/shift)/ update local storage and re-render buttons
  // MOVE THIS TO A FUNCTION!!!!!!
  if (searchLocation != "") {
    //locationS = searchLocation;
    console.log("before function"+locationS);

    

    //check if url incudes valid location
    UrlExists() 

    //if returns true add button
    if ( UrlExists() ) {

      addButton()

    }

/*
    //clear input value
    $("input").val("");

    //append search location to array/local storage
    retreivedCities.push(location);
    console.log(retreivedCities.length);

    // shift array to remove first item if greater than 5
    if (retreivedCities.length > 5) {
      retreivedCities.shift();
    }

    //update local storage
    localStorage.setItem("weatherAppStored", JSON.stringify(retreivedCities));

    //clear aside
    $("aside").find("p").remove();
    $("aside").find("h3").remove();

    //call render buttons function
    renderButtons();
*/
    //if search location is empty
  } else if (typeof locationS == "undefined") {
    //run error function
    errorTrap();
    return false;
  }
  //end if

  //clear previous displays
  //$("#today").empty("");
  //$("#forecast").empty("");

  console.log(locationS);


  //console.log("fsdfdsf"+APIKey);
  //console.log('dfdsfsdf'+queryURL);

  //ajax calls

 /* var APIKey = "c90265758d6d690ed02c2c3f3028ca77";
  queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    locationS +
    "&appid=" +
    APIKey;
*/
  // ajax call for summary
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    //convert temperature to celcius
    var conTemp = parseFloat(response.main.temp) - 273.15;
    // apend today summary div
    $("#today").append(
      `<div><b>${response.name} - ${currentDate}</b></div>
      <div>Temp: ${conTemp.toFixed(2)}°C</b></div>
      <div>Wind: ${response.wind.speed}</div>
      <div>Humidity: ${response.main.humidity}</div>`
    );

    var lat = response.coord.lat;
    var lon = response.coord.lon;
    var queryURL ="https://api.openweathermap.org/data/2.5/forecast?lat=" +lat + "&lon=" + lon + "&appid=" + APIKey;

    // ajax call for 5day forecast
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);

      $("#forecast").append(
        `<div class="col-12">
      <h4>5 Day Forecast</h4>
    </div>`
      );

      //loop through 5 days increments of 8?
      for (let index = 5; index < 40; index = index + 8) {
        //convert temperature to celcius
        var conTemp = parseFloat(response.list[index].main.temp) - 273.15;

        $("#forecast").append(
          `<div class="card bg-dark text-white" style="width:12rem; margin:0 0 3px 3px;">
          <div class="card-body">
          <h5 class="card-title">${response.city.name}</h5>
          <p class="card-text"><img src="http://openweathermap.org/img/wn/${response.list[index].weather[0].icon}@2x.png" alt="${response.list[index].weather[0].description}" </img></p>
          <p class="card-text">Temp: ${conTemp.toFixed(2)}°C</p>
          <p class="card-text">Wind: ${response.list[index].wind.speed}</p>
          <p class="card-text">Humidity: ${response.list[index].main.humidity}</p>
          </div>
          </div>`
        );
      }
      //end for loop
    });
  });
});
// Search end ---------------------------------------------------------------

// ErrorTrap Function -------------------------------------------------------
function errorTrap(error) {

  if (error == 2){

    $("#today").empty("");
  $("#forecast").empty("");
  $("#today").prepend(
    `<div class="alert alert-warning"><b>that place doesn't exist sorry!</b></div>`
  );

  }else {
  console.log("there was an error");
  $("#today").empty("");
  $("#forecast").empty("");
  $("#today").prepend(
    `<div class="alert alert-warning"><b>Please enter a city name in the search box</b></div>`
  );
}
}
// ErrorTrap Function end ---------------------------------------------------



function addButton(){
  //clear input value
  $("input").val("");

  //append search location to array/local storage
  retreivedCities.push(locationS);
  console.log(retreivedCities.length);

  // shift array to remove first item if greater than 5
  if (retreivedCities.length > 5) {
    retreivedCities.shift();
  }

  //update local storage
  localStorage.setItem("weatherAppStored", JSON.stringify(retreivedCities));

  //clear aside
  $("aside").find("p").remove();
  $("aside").find("h3").remove();

  //call render buttons function
  renderButtons();
}



//https://www.finleyghosh.com/blog/check-for-a-page-404-with-only-javascript//
    function UrlExists() {
      url = queryURL;
//console.log(queryURL)
//console.log('checking url')
        var http = new XMLHttpRequest();
        http.open('HEAD', url, false);
        http.send();
        if (http.status != 404){
          console.log('true')
          return true;
        }else{
          //console.log('false')
          $("input").val("");

        errorTrap(2);
            return false;
          }
    }




    /*
              <p class="card-text">${moment(response.list[index].dt_txt).format("dddd, Do MMMM")}</p>
*/