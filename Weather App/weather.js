const input = document.getElementById("text");
const inputSection = document.querySelector(".city-form");
const resultContainer = document.querySelector(".weatherResult");
const suggestionsContainer = document.querySelector(".suggestionsContainer");

const apiKey = "12884dfb18704135aefb1d57c02b9d48";

// Show loading state
function showLoading() {
    resultContainer.innerHTML = '<div class="loading">Loading weather data</div>';
    resultContainer.style.display = "block";
}

// Change background based on weather
function updateBackground(weatherDesc) {
    const body = document.body;
    body.className = ''; // Remove all classes

    if (weatherDesc.includes('clear') || weatherDesc.includes('sun')) {
        body.classList.add('clear-day');
    } else if (weatherDesc.includes('cloud') || weatherDesc.includes('overcast')) {
        body.classList.add('cloudy');
    } else if (weatherDesc.includes('rain') || weatherDesc.includes('drizzle') || weatherDesc.includes('shower')) {
        body.classList.add('rainy');
    } else if (weatherDesc.includes('snow')) {
        body.classList.add('snowy');
    }
}

// Search form submission
inputSection.addEventListener("submit", function (event) {
    event.preventDefault();
    const inputValue = input.value.trim();
    input.value = "";

    if (inputValue.length === 0) {
        suggestionsContainer.innerHTML = "";
        resultContainer.style.display = "none";
        return;
    }

    showLoading();

    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(inputValue)}&key=${apiKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const suggestions = data.results;
            suggestionsContainer.innerHTML = '';
            resultContainer.style.display = "none";
            suggestionsContainer.style.display = "block";

            if (suggestions.length > 0) {
                suggestions.slice(0, 5).forEach(result => {
                    const div = document.createElement('div');
                    div.className = 'suggestionItem';
                    div.textContent = result.formatted;
                    div.addEventListener('click', () => {
                        suggestionsContainer.style.display = "none";
                        weatherDetails(result.geometry.lat, result.geometry.lng, result.formatted, result.components.state || result.components.country);
                    });
                    suggestionsContainer.appendChild(div);
                });
            } else {
                throw new Error("No results found!");
            }
        })
        .catch(error => {
            errorDisplay(error);
        });
});

// Fetch and display weather details
function weatherDetails(lat, lon, name, state) {
    const apiKey = '156b90bd3c79480387cd77c41db23a8c';

    function getFirstTwoWords(str) {
        const words = str.split(" ");
        return words.length >= 2 ? words.slice(0, 2).join(" ") : str;
    }

    const shortName = getFirstTwoWords(name);

    showLoading();

    fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${apiKey}&days=2`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Weather data fetch failed');
            }
            return response.json();
        })
        .then(data => {
            const dailyData = data.data[0];
            const nextDay = data.data[1];

            // Update background based on weather
            updateBackground(dailyData.weather.description.toLowerCase());

            resultContainer.innerHTML = `
                <p class="cityname">${shortName}, ${state} <span class="save"><i class="fa-solid fa-bookmark"></i></span></p>
                <h1 class="temp">${dailyData.temp}°C</h1>
                <div class="dayImage">
                    <img src="https://www.weatherbit.io/static/img/icons/${dailyData.weather.icon}.png" alt="${dailyData.weather.description}" class="img">
                    <p class="day">${dailyData.weather.description}</p>
                </div>
                <p class="feelslike">🌡️ Feels like: ${dailyData.app_max_temp}°C</p>
                <div class="otherdetails">
                    <div class="max-cont">
                        <p class="maxtemp">🔥 Max temp<br>${dailyData.max_temp}°C</p>
                    </div>
                    <div class="min-cont">
                        <p class="mintemp">❄️ Min temp<br>${dailyData.min_temp}°C</p>
                    </div>
                    <div class="humidity-cont">
                        <p class="humidity">💧 Humidity<br>${dailyData.rh}%</p>
                    </div>
                    <div class="visbility-cont">
                        <p class="visbility">👁️ Visibility<br>${(dailyData.vis - 14).toFixed(1)} km</p>
                    </div>
                    <div class="airUV-cont">
                        <p class="airUV">🔆 UV Index<br>${dailyData.uv}</p>
                    </div>
                    <div class="rain-cont">
                        <p class="rainChance">⛈️ Rain Chance<br>${dailyData.pop}%</p>
                    </div>
                    <div class="windspeed">
                        <p class="wind">💨 Wind Speed: ${(dailyData.wind_gust_spd * 3.6).toFixed(2)} km/h (${dailyData.wind_cdir_full})</p>
                    </div>
                    <div class="nextday-cont">
                        <p class="nextday">📅 Tomorrow: ${nextDay.max_temp}°C / ${nextDay.min_temp}°C - ${nextDay.weather.description}</p>
                    </div>
                </div>
            `;
            resultContainer.style.display = "block";

            console.log("Weather data:", data);

            // Setup save button
            document.querySelector(".save").addEventListener("click", function () {
                saveLocation(lat, lon, name, state);
                this.innerHTML = '<i class="fa-solid fa-bookmark" style="color:#ffd89b;"></i>';

                setTimeout(() => {
                    this.innerHTML = '<i class="fa-solid fa-bookmark"></i>';
                }, 2000);
            });
        })
        .catch(error => errorDisplay(error));
}

// Display error messages
function errorDisplay(error) {
    console.error("Error:", error);
    resultContainer.innerHTML = "";
    const errorMsg = document.createElement("h1");
    errorMsg.className = "errormsg";
    errorMsg.textContent = `⚠️ Oops! ${error.message || 'Something went wrong!'}`;
    resultContainer.appendChild(errorMsg);
    resultContainer.style.display = "block";
    errorMsg.style.display = "block";
}

// Save location to localStorage
function saveLocation(latitude, longitude, name, state) {
    localStorage.clear();
    const location = [latitude, longitude, name, state];
    localStorage.setItem("savedLocation", JSON.stringify(location));
    console.log("Location saved!");
}

// Load saved location on page load
window.addEventListener('load', function () {
    if (localStorage.getItem("savedLocation")) {
        const location = JSON.parse(localStorage.getItem("savedLocation"));
        const [lat, lon, name, state] = location;
        weatherDetails(lat, lon, name, state);
    }
});