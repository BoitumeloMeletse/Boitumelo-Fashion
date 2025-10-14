// weather.js
const apiKey = "4764e36cac2b0d43ab02c8560871a486";

async function fetchWeather() {
  const weatherDiv = document.getElementById("weather");
  if (!weatherDiv) return;

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Johannesburg,ZA&appid=${apiKey}&units=metric`);
    const data = await response.json();
    const temp = Math.round(data.main.temp);
    const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    weatherDiv.innerHTML = `<img src="${icon}" alt="weather"><span>${data.name}: ${temp}°C</span>`;
  } catch (error) {
    weatherDiv.textContent = "Weather unavailable";
  }
}

document.addEventListener("DOMContentLoaded", fetchWeather);
