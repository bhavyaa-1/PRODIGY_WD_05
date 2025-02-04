const apiKey = '34f99f790d23bc7c8b8196c9287c017e';  // Replace this with your OpenWeatherMap API key

// Function to fetch weather by user-inputted location
function getWeatherByLocation() {
    const cityName = document.getElementById('location-input').value.trim();
    if (!cityName) return alert('Please enter a location!');

    document.getElementById('loading').style.display = 'block'; // Show loading

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById('loading').style.display = 'none'; // Hide loading
            if (data.cod === '404') {
                alert('City not found!');
            } else {
                displayWeather(data);
            }
        })
        .catch(error => {
            document.getElementById('loading').style.display = 'none'; // Hide loading
            console.error('Error fetching weather data:', error);
            alert('Failed to fetch weather data.');
        });
}

// Function to fetch weather based on the user's current location
function getCurrentLocationWeather() {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.');
    }

    document.getElementById('loading').style.display = 'block'; // Show loading

    navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                document.getElementById('loading').style.display = 'none'; // Hide loading
                displayWeather(data);
            })
            .catch(error => {
                document.getElementById('loading').style.display = 'none'; // Hide loading
                console.error('Error fetching weather data:', error);
                alert('Failed to fetch weather data.');
            });
    }, () => {
        document.getElementById('loading').style.display = 'none'; // Hide loading
        alert('Unable to retrieve your location.');
    });
}

// Function to display weather data
function displayWeather(data) {
    const cityName = data.name;
    const temperature = data.main.temp;
    const weatherDescription = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const weatherIcon = data.weather[0].icon;

    // Update the weather icon
    const iconUrl = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
    document.getElementById('weather-icon').innerHTML = `<img src="${iconUrl}" alt="weather icon" />`;

    document.getElementById('city-name').textContent = `Weather in ${cityName}`;
    document.getElementById('temperature').textContent = `${temperature}°C`;
    document.getElementById('weather-description').textContent = capitalizeFirstLetter(weatherDescription);
    document.getElementById('humidity').textContent = `Humidity: ${humidity}%`;
    document.getElementById('wind-speed').textContent = `Wind Speed: ${windSpeed} m/s`;
}

// Function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
