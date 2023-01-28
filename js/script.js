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