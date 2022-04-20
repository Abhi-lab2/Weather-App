var api = {
  key: "fa92dc251d3944bd43705b1c6ad2ef81",
  base: "https://api.openweathermap.org/data/2.5/",
};
let iframe = document.getElementById("gmap_canvas");

const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(function (weather) {
      return weather.json();
    })
    .then(displayResults);
}
// Weather Report Display
function displayResults(weather) {
  let city = document.querySelector(".location .city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now);

  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector(".current .weather");
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector(".hi-low");
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(
    weather.main.temp_max
  )} °c`;

  iframe.src = `https://maps.google.com/maps?q=${weather.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
}
// For the 7 Day Weather Report-----------------------------------------------------
//https://api.openweathermap.org/data/2.5/forecast?q=pune&cnt=7&appid={API%20Key}
// var api = {
//   key: "fa92dc251d3944bd43705b1c6ad2ef81",
//   base: "https://api.openweathermap.org/data/2.5/",
// };
// const searchbox = document.querySelector(".search-box");
// searchbox.addEventListener("keypress", setQuery);

// function setQuery(evt) {
//   if (evt.keyCode == 13) {
//     getres(searchbox.value);
//   }
// }
// function getres(query) {
//   fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
//     .then(function (weatherNew) {
//       return weatherNew.json();
//     })
//     .then(res);
// }

// function res(weatherNew) {
//   let city = document.querySelector(".location .city");
//   city.innerText = `${weatherNew.name}, ${weatherNew.sys.country}`;

//   let now = new Date();
//   let date = document.querySelector(".location .date");
//   date.innerText = dateBuilder(now);

//   let temp = document.querySelector(".current .temp");
//   temp.innerHTML = `${Math.round(weatherNew.main.temp)}<span>°c</span>`;

//   let weather_el = document.querySelector(".current .weatherNew");
//   weather_el.innerText = weatherNew.weather[0].main;

//   let hilow = document.querySelector(".hi-low");
//   hilow.innerText = `${Math.round(weatherNew.main.temp_min)}°c / ${Math.round(
//     weatherNew.main.temp_max
//   )} °c`;
// }

//Calender Commmon for All
function dateBuilder(d) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // For Calender Sathi..
  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
