const input = document.getElementById("text");
const inputSection = document.querySelector(".city-form");
const resultContainer = document.querySelector(".weatherResult");
const suggestionsContainer = document.querySelector(".suggestionsContainer");

const apiKey = "12884dfb18704135aefb1d57c02b9d48";

inputSection.addEventListener("submit", function(event){
    event.preventDefault();
    const inputValue = input.value;
    input.value = "";
    if(inputValue.length === 0){
        suggestionsContainer.innerHTML = "";
        return;
    }

    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(inputValue)}&key=${apiKey}`)
    .then(response=>{
        return response.json()
    }).then(data =>{
        const suggestions = data.results;
        suggestionsContainer.innerHTML = '';
        resultContainer.style.display = "none";
        suggestionsContainer.style.display = "block";
        
        if(suggestions.length > 0){

            suggestions.forEach(result => {
                const div = document.createElement('div');
                div.className = 'suggestionItem';
                div.textContent = result.formatted;
                div.addEventListener('click', () => {
                    suggestionsContainer.style.display = "none";
                    weatherDetails(result.geometry.lat, result.geometry.lng, result.formatted, result.components.state);
                });
                suggestionsContainer.appendChild(div);
            });
        }else{
            throw new Error("Result not found!");
        }
    })
    .catch(error =>{
        errorDisplay(error);
    })
 
})

function weatherDetails(lat, lon, name, state){
    const apiKey = '156b90bd3c79480387cd77c41db23a8c';

    function getFirstTwoWords(str) {
        const words = str.split(" ");
        if (words.length >= 2) {
            return words.slice(0, 2).join(" ");
        } else {
            return str;
        }
    }

    const shortName = getFirstTwoWords(name);


    fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${apiKey}&days=2`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const dailyData = data.data[0];
            const nextDay = data.data[1];

            resultContainer.innerHTML = `
                <p class="cityname">${shortName} ${state} <span class="save"><i class="fa-solid fa-house"></i></span></p>
                <h1 class="temp">${dailyData.temp} °C</h1>
                <div class="dayImage">
                    <img src="https://www.weatherbit.io/static/img/icons/${dailyData.weather.icon}.png" alt="logo" class="img">
                    <p class="day">${dailyData.weather.description}</p>
                </div>
                <p class="feelslike">🌡️Feels like: ${dailyData.app_max_temp}°C</p>
                <div class="otherdetails">
                    <div class="max-cont">
                        <p class="maxtemp">🔥Max temp: ${dailyData.max_temp}°C</p>
                    </div>
                    <div class="min-cont">
                        <p class="mintemp">❄️Min temp: ${dailyData.min_temp}°C</p>
                    </div>
                    <div class="humidity-cont">
                        <p class="humidity">💧Humidity: ${dailyData.rh}%</p>
                    </div>
                    <div class="visbility-cont">
                        <p class="visbility">👁️Visbility: ${(((dailyData.vis)-14).toFixed(1))} KM</p>
                    </div>
                    <div class="airUV-cont">
                        <p class="airUV">🔆UV: ${dailyData.uv} | | ⛄Snow: ${dailyData.snow}</p>
                    </div>
                    <div class="rain-cont">
                        <p class="rainChance">⛈️Chance of rain: ${dailyData.pop}%</p>
                    </div>
                    <div class="windspeed">
                        <p class="wind">💨Wind Speed: ${((dailyData.wind_gust_spd)*3.6).toFixed(2)} KM/H (${dailyData.wind_cdir_full})</p>
                    </div>
                    <div class="nextday-cont">
                        <p class="nextday">Tomorrow Temp. (Max/min): ${nextDay.max_temp}°C / ${nextDay.min_temp}°C</p>
                    </div>
                </div>
            `;
            resultContainer.style.display = "block";

            console.log(data);
            

            document.querySelector(".save").addEventListener("click", function(){
                saveLatLon(lat, lon, name, state);
            })
        })
        .catch(error => errorDisplay(error));
    
}

function errorDisplay(error){
    console.log(error);
    resultContainer.innerHTML = "";
    const errorMsg = document.createElement("h1");
    errorMsg.classList.add = "errormsg";
    errorMsg.textContent = `SOMETHING WENT WRONG! ${error}`
    resultContainer.append(errorMsg)
    resultContainer.style.display = "block";
    errorMsg.style.display = "block";
    errorMsg.style.color = "red";
    errorMsg.style.fontSize = "20px";
}

function saveLatLon(latitue, longitude, name, state){
    localStorage.clear();
    const location = [latitue, longitude, name, state]
    localStorage.setItem("items", JSON.stringify(location));
}
window.onload = function(){
    if(localStorage.getItem("items")){
        const location = JSON.parse(localStorage.getItem("items"));
        const[lat, lon, name, state] = location;
        weatherDetails(lat, lon, name, state);
        
    }
}