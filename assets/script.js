var currencyEl = document.getElementById('date');

var recentSearches = [];
var city = '';


function searchFunction(data) {

  recentSearches.push($('#textboxSearch').val());
  city = $('#textboxSearch').val();
  $('#textboxSearch').val("");
  $('#searchHistory').text("");

  $.each(recentSearches, function (index, value) {
    $('#searchHistory').append("<li class='historyItem'  onclick='addtotextbox(" + index + ")'>" + value + '</li>');
    //pass city name to city search api
    getCity(city);
  });
}

function addtotextbox(id) {
  $('#textboxSearch').val(recentSearches[id]);
};


var currencyDropdown = document.getElementById('currency-dropdown');
var currencyTextEl = document.getElementById('currency-text2');
currencyTextEl.textContent = "";

//Listener for Currency DropDown Selection. Fire Function to fill Text portion.
currencyDropdown.addEventListener("change", function () {
  currencyTextEl.textContent = "Example: $100 can be exchanged for approximately " + (this.value * 100) + " of these less applicable fees. If you receive substantially less, you are getting ripped off!";
})

var countriesArray = [];
var countryCodesArray = [];
var option = "";
var rates = {};
var requestURL = 'https://api.exchangerate.host/latest?base=USD';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function () {
  var data = request.response;
  console.log(data);
  sortProperties(data);
}
var sortProperties = function (data) {
  //Assign Date to variable
  var date = data.date;
  //Assign Country Rates to variable
  rates = data.rates;
  //Convert Object to Array and store in countriesArray
  Object.entries(rates).map(item => {
    countriesArray.push(...item);
  })
    ;
  currencyEl.textContent = "*rates as of: " + "06-16-2022";
  PopulateCountryCodes();
  return rates;
}
//Pull out country Codes from rates and store into countryCodesArray
var PopulateCountryCodes = function () {
  for (var i = 0; i < countriesArray.length; i += 2) {
    countryCodesArray.push(countriesArray[i]);
  }
  dropDownList();
}
var dropDownList = function () {
  option += '<option value="' + rates.AUD.toFixed(2) + '">' + 'Australian Dollar: ' + rates.AUD.toFixed(2) + "</option>"
  option += '<option value="' + rates.BRL.toFixed(2) + '">' + 'Brazillian real: ' + rates.BRL.toFixed(2) + "</option>"
  option += '<option value="' + rates.GBP.toFixed(2) + '">' + 'British Pound: ' + rates.GBP.toFixed(2) + "</option>"
  option += '<option value="' + rates.CAD.toFixed(2) + '"selected>' + 'Canadian Dollar: ' + rates.CAD.toFixed(2) + "</option>"
  option += '<option value="' + rates.CNY.toFixed(2) + '">' + 'Chinese Yuan: ' + rates.CNY.toFixed(2) + "</option>"
  option += '<option value="' + rates.EUR.toFixed(2) + '">' + 'European Euro: ' + rates.EUR.toFixed(2) + "</option>"
  option += '<option value="' + rates.INR.toFixed(2) + '">' + 'Indian Ruppe: ' + rates.INR.toFixed(2) + "</option>"
  option += '<option value="' + rates.JPY.toFixed(2) + '">' + 'Japanese Yen: ' + rates.JPY.toFixed(2) + "</option>"
  option += '<option value="' + rates.MXN.toFixed(2) + '">' + 'Mexican Peso: ' + rates.MXN.toFixed(2) + "</option>"
  option += '<option value="' + rates.NZD.toFixed(2) + '">' + 'New Zealand Dollar: ' + rates.NZD.toFixed(2) + "</option>"
  option += '<option value="' + rates.RUB.toFixed(2) + '">' + 'Russian Ruble: ' + rates.RUB.toFixed(2) + "</option>"
  option += '<option value="' + rates.ZAR.toFixed(2) + '">' + 'South African Rand: ' + rates.ZAR.toFixed(2) + "</option>"
  option += '<option value="' + rates.CHF.toFixed(2) + '">' + 'Swiss Franc: ' + rates.CHF.toFixed(2) + "</option>"
  option += '<option value="' + rates.THB.toFixed(2) + '">' + 'Thailand Baht: ' + rates.THB.toFixed(2) + "</option>"
  option += '<option value="' + rates.AED.toFixed(2) + '">' + 'United Arab Emirates: ' + rates.AED.toFixed(2) + "</option>"
  currencyDropdown.innerHTML = option;
}
console.log(countryCodesArray);
console.log(countryCodesArray);
//weather variables
const apiKey = "Z5jGBtEgG3IzUTHYWCvsGfONcnfOoC3V";
var locationKey = {};
var temp = '';
var weatherIcon = '';
var temperatureEl = document.getElementById('temperature');
var tempIconEl = document.getElementById('temp-icon');
var forecastOneEl = document.getElementById('forecast1');
var forecastTwoEl = document.getElementById('forecast2');
var forecastThreeEl = document.getElementById('forecast3');
var forecastFourEl = document.getElementById('forecast4');
var dateZeroEl = document.getElementById('date0');
var dateOneEl = document.getElementById('date1');
var dateTwoEl = document.getElementById('date2');
var dateThreeEl = document.getElementById('date3');
var dateFourEl = document.getElementById('date4');
var iconOneEl = document.getElementById('icon1');
var iconTwoEl = document.getElementById('icon2');
var iconThreeEl = document.getElementById('icon3');
var iconFourEl = document.getElementById('icon4');
var forecastDateOne = '';
var forecastDateTwo = '';
var forecastDateThree = '';
var forecastDateFour = '';
var forecastDayFive = '';
var tempOne = '';
var tempTwo = '';
var tempThree = '';
var tempFour = '';
// beginning of weather api //
var getCity = function (city) {
  const base = "https://dataservice.accuweather.com/locations/v1/cities/search?apikey=" + apiKey;
  const query = '&q=' + city + '&offset=0';
  fetch(base + query)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          locationKey = data[0]?.Key;
          getWeather(locationKey);
          getForecast(locationKey);
        })
      } else {
        alert("City Not Found");
      }
    })
    .catch(function (error) {
      console.log(error);
    })
}
const getWeather = async (locationKey) => {
  const base = "https://dataservice.accuweather.com/currentconditions/v1/"
  const query = locationKey + "?apikey=" + apiKey;
  const response = await fetch(base + query);
  const data = await response.json();
  console.log(data);
  temp = data[0].Temperature.Imperial.Value;
  weatherIcon = data[0].WeatherIcon;
  console.log(weatherIcon);
  temperatureEl.textContent = temp + " F°";
  dateZeroEl.textContent = "Today's Weather";
  tempIconEl.setAttribute('src', './assets/icons/' + weatherIcon + '.png');
}
const getForecast = async (locationKey) => {
  const base = "https://dataservice.accuweather.com/forecasts/v1/daily/5day/";
  const query = locationKey + "?apikey=" + apiKey;
  const response = await fetch(base + query);
  const data = await response.json();
  console.log(data);
  forecastDateOne = data.DailyForecasts[0].Date.split("T")[0];
  forecastDateTwo = data.DailyForecasts[1].Date.split("T")[0];
  forecastDateThree = data.DailyForecasts[2].Date.split("T")[0];
  forecastDateFour = data.DailyForecasts[3].Date.split("T")[0];
  forecastDateFive = data.DailyForecasts[4].Date.split("T")[0];
  tempOne = data.DailyForecasts[1].Temperature.Maximum.Value;
  tempTwo = data.DailyForecasts[2].Temperature.Maximum.Value;
  tempThree = data.DailyForecasts[3].Temperature.Maximum.Value;
  tempFour = data.DailyForecasts[4].Temperature.Maximum.Value;
  iconOne = data.DailyForecasts[1].Day.Icon;
  iconTwo = data.DailyForecasts[2].Day.Icon;
  iconThree = data.DailyForecasts[3].Day.Icon;
  iconFour = data.DailyForecasts[4].Day.Icon;
  iconOneEl.setAttribute('src', './assets/icons/' + iconOne + ".png");
  iconTwoEl.setAttribute('src', './assets/icons/' + iconTwo + ".png");
  iconThreeEl.setAttribute('src', './assets/icons/' + iconThree + ".png");
  iconFourEl.setAttribute('src', './assets/icons/' + iconFour + ".png");
  forecastOneEl.textContent = tempOne + "F°";
  forecastTwoEl.textContent = tempTwo + "F°";
  forecastThreeEl.textContent = tempThree + "F°";
  forecastFourEl.textContent = tempFour + "F°";
  dateOneEl.textContent = forecastDateTwo;
  dateTwoEl.textContent = forecastDateThree;
  dateThreeEl.textContent = forecastDateFour;
  dateFourEl.textContent = forecastDateFive;
  console.log(tempOne, tempTwo, tempThree, tempFour);
}
