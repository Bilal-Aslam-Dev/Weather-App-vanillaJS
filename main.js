let today = document.querySelector(".day")
let date = document.querySelector(".date")
let loc = document.querySelector(".location")
let city = document.getElementById("city")
let temp = document.querySelector(".temperature")
let tempText = document.querySelector(".temperature-text")
let windVal = document.querySelector(".wind_val")
let humidVal = document.querySelector(".humid_val")
let weatherIcon = document.querySelector(".weather-icon")
let feelVal = document.querySelector(".feel_val")
let todayDate = new Date()

switch (new Date().getDay()) {
    case 0:
      day = "Sunday";
      break;
    case 1:
      day = "Monday";
      break;
    case 2:
       day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
}

date.textContent = todayDate.toLocaleDateString()
today.textContent = day

function getWeatherData() {
    let select = document.getElementById("city_select")
    cityName = select.options[select.selectedIndex].value
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=1b8ab4208b83f3ad1f6261160b704669`)
        .then(res => res.json())
        .then(data => {
    //
    console.log(data)
    let celcius
    celcius = ((data.main.temp - 273.15))
    let kelToCel = celcius.toFixed(1) + "°C"
    temp.textContent = kelToCel
    windVal.textContent = data.wind.speed + "km/h"
    humidVal.textContent = data.main.humidity + "%"
    tempText.textContent = data.weather[0].main
    weatherIcon.src = `http://openweathermap.org/img/w/` + data.weather[0].icon + `.png`
    city.textContent = cityName
    feelVal.textContent = (data.main.feels_like - 273.15).toFixed(1) + "°C"
  })  
}

document.getElementById("city_select").addEventListener('change', () => {
    getWeatherData()
})

getWeatherData()

 /////ANIMATION//////

let myPanel = document.getElementById("panel");
let subpanel = document.getElementById("panel-container");

myPanel.onmousemove = transformPanel;
myPanel.onmouseenter = handleMouseEnter;
myPanel.onmouseleave = handleMouseLeave;

let mouseX, mouseY;

let transformAmount = 5;

function transformPanel(mouseEvent) {
    mouseX = mouseEvent.pageX;
    mouseY = mouseEvent.pageY;

    const centerX = myPanel.offsetLeft + myPanel.clientWidth / 2;
    const centerY = myPanel.offsetTop + myPanel.clientHeight / 2;

    const percentX = (mouseX - centerX) / (myPanel.clientWidth / 2);
    const percentY = -((mouseY - centerY) / (myPanel.clientHeight / 2));

    subpanel.style.transform = "perspective(400px) rotateY(" + percentX * transformAmount + "deg) rotateX(" + percentY * transformAmount + "deg)";
}

function handleMouseEnter() {
    setTimeout(() => {
        subpanel.style.transition = "";
    }, 100);
    subpanel.style.transition = "transform 0.1s";
}

function handleMouseLeave() {
    subpanel.style.transition = "transform 0.1s";
    setTimeout(() => {
        subpanel.style.transition = "";
    }, 100);

    subpanel.style.transform = "perspective(400px) rotateY(0deg) rotateX(0deg)";
}