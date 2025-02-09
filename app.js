const apiKey = "966f2f336d2c714280d33fd48f9c5bc5"; // Replace with your actual API key

function getWeather() {
  const city = document.getElementById('city-input').value.trim();

  // If no city is entered, show an error
  if (!city) {
    showError("Please enter a city name");
    return;
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  clearPreviousResults();

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(data => {
      displayWeatherData(data);
    })
    .catch(error => {
      showError(error.message);
    });
}

function displayWeatherData(data) {
  document.getElementById('city-name').textContent = `${data.name}, ${data.sys.country}`;
  document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
  document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
  document.getElementById('description').textContent = `Description: ${data.weather[0].description}`;
  document.getElementById('wind-speed').textContent = `Wind Speed: ${data.wind.speed} m/s`;

  // Update background based on weather
  updateBackground(data.weather[0].main.toLowerCase());

  document.getElementById('weather-info').classList.remove('hidden');
}

function showError(message) {
  document.getElementById('error-message').textContent = message;
  document.getElementById('error-message').style.opacity = 1;
  document.getElementById('error-message').classList.remove('hidden');
}

function clearPreviousResults() {
  document.getElementById('error-message').classList.add('hidden');
  document.getElementById('weather-info').classList.add('hidden');
}

// Update background based on weather type
function updateBackground(weatherType) {
  document.body.classList.remove('sunny', 'cloudy', 'rainy', 'clear');

  if (weatherType.includes("sun")) {
    document.body.classList.add('sunny');
  } else if (weatherType.includes("cloud")) {
    document.body.classList.add('cloudy');
  } else if (weatherType.includes("rain")) {
    document.body.classList.add('rainy');
  } else {
    document.body.classList.add('clear');
  }
}
