/************************** SET UP **************************/
const date = new Date();
var stringOfDay = getDayByDate(date);
var city;
var cityLocation;
var defaultData;

/************************** HTML **************************/
let cityName = document.getElementById('city__name');
let dateName = document.getElementById('date__name');
let stateIcon = document.getElementById('state__icon');
let stateName = document.getElementById('state__name');
let tempData = document.getElementById('temp__data');
let windData = document.getElementById('wind__data');
let humidityData = document.getElementById('humidity__data');
let feelsLikeData = document.getElementById('feelsLike__data');
let airPreasureData = document.getElementById('airPreasure__data');
let searchForm = document.getElementById('search__form');
let locationInput = document.getElementById('location__input')







window.onload = () => {
    navigator.geolocation.getCurrentPosition(
        function (position) {
            console.log(position.coords.latitude, position.coords.longitude);

        }
    )
    city = 'Madrid';
    defaultData = getWeatherInfo(city);
}
const getWeatherInfo = async (city) => {

    const response = await fetch(`https://community-open-weather-map.p.rapidapi.com/find?q=${city}&units=metric`, {
        'headers': {
            'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
            'x-rapidapi-key': '61e4f4e66emshd8443cd4da9242bp164dcfjsn107ecae487db'
        }
    });

    const data = await response.json();
    console.log(data);
    setInfo(data);
}

const setInfo = (object) => {
    //stateIcon.src = `https://www.metaweather.com/static/img/weather/${data.weather_state_abbr}.svg`;
    stateName.innerHTML = object.list[0].weather[0].description;
    dateName.innerHTML = `${stringOfDay}`;
    tempData.innerHTML = Math.round(object.list[0].main.temp) + '<span>ºC</span>';
    cityName.innerHTML = `<i class="uil uil-map-marker"></i> ${object.list[0].name}`;
    windData.innerHTML = Math.round((object.list[0].wind.speed * 1.6093449)) + ' km/h';
    humidityData.innerHTML = object.list[0].main.humidity + ' %';
    feelsLikeData.innerHTML = Math.round(object.list[0].main.feels_like) + '<span>ºC</span>';
    airPreasureData.innerHTML = `${object.list[0].main.pressure} mb`;
}

searchForm.addEventListener('submit', x => {
    x.preventDefault();
    console.log(locationInput.value);
    getWeatherInfo(locationInput.value);
})


function getDayByDate(date) {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    return days[date.getDay()] + ', ' + date.getDate() + ' ' + monthNames[date.getDate()];
}
