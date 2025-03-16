// require('dotenv').config();
document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherButton = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");

  //alter the API_KEY
  const API_KEY = "Process.env.API_KEY";

  getWeatherButton.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return;

    //it may throw an error
    //server/database is always at other continent

    try {
      const weatherData = await fetchWeatherData(city);
      console.log("Weather Data: ", weatherData);
      
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
  });

  async function fetchWeatherData(city) {
    //gets data from API
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);
    console.log("TYPE OF RESPONSE : ",typeof response);
    console.log("RESPONSE : ", response);
    
    if (!response.ok) throw new Error("City Not Found!");
    
    const data = await response.json();
    return data;
  }

  function displayWeatherData(data) {
    //display weather data
		console.log(data);
		const {name,main,weather} = data;
    cityNameDisplay.textContent = name;
    temperatureDisplay.textContent = `Temperature : ${main.temp}`;
    descriptionDisplay.textContent = `Weather : ${weather[0].description}`;
		//unlock the display
		weatherInfo.classList.remove("hidden");
		errorMessage.classList.add("hidden");

  }

  function showError() {
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
  }
});
