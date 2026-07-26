const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const cityName = document.getElementById("city-name");
const cityIcon = document.getElementById("weather-icon");
const cityTemperature = document.getElementById("temperature")
const cityDescription = document.getElementById("description");
const cityHumidity = document.getElementById("humidity");
const cityWind = document.getElementById("wind-speed");
const errorMessage = document.getElementById("error-message");

const weatherCard = document.querySelector('.search-box + div');
const weatherDetails = document.querySelector('.weather-details');
const errorContainer = document.querySelector('.err');

function Searching() {
    const city = cityInput.value;
    if (city == '') {
        errorMessage.textContent = 'City name cannot be null';
        return;
    }
    console.log(city)
    getWeatherData(city);
}


async function getWeatherData(city){
    const API_KEY = 'b66e27f6feb02b63b1083d4f330d50f8'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        errorMessage.textContent = '';
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('City not found!')
        }
        const data = await response.json();
        errorContainer.style.display = 'none';
        weatherCard.style.display = 'block';
        weatherDetails.style.display = 'flex';

        console.log(data)
        showWeather(data);
        
    } catch(error) {
        weatherCard.style.display = 'none';
        weatherDetails.style.display = 'none';
        errorMessage.textContent = error.message;
        errorContainer.style.display = 'block';
    }
}

function showWeather(data){
    cityName.textContent = data.name;

    const iconCode = data.weather[0].icon;
    const iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`

    cityIcon.src = iconURL;
    cityIcon.alt = data.weather[0].description;

    cityTemperature.textContent = `${Math.round(data.main.temp)} °C`;
    cityDescription.textContent = data.weather[0].description;
    cityHumidity.textContent = `${Math.round(data.main.humidity)} %`;
    cityWind.textContent = `${data.wind.speed} m/s`;

}
