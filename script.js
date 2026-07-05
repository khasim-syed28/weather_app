const location_name = document.querySelector(".location-name")
const weather_desc = document.querySelector(".weather-desc")
const current_temp = document.querySelector(".current-temp")
const feelsLike = document.querySelector("#feelsLike")
const humidity = document.querySelector("#humidity")
const wind_speed = document.querySelector("#wind_speed")
const local_time = document.querySelector("#local-time")
const iconImg = document.querySelector(".weather-icon");
const location_header = document.querySelector(".location-header") 
// search
const search_input = document.querySelector(".search-input");
const search_btn = document.querySelector(".search-btn");

//Loading 
const loadingSpinner = document.querySelector("#loading-spinner");
const weatherDetailsSection = document.querySelector(".metrics-grid"); 
const mainWeatherSection = document.querySelector(".main-weather");





function renderWeather(data){

    if (data.cod == "404") {
    // City not found
    location_name.textContent = "No City Found";
    weather_desc.textContent = "0";
    current_temp.textContent = "0";
    feelsLike.textContent = "0";
    humidity.textContent = "0";
    wind_speed.textContent = "0";
    local_time.textContent = "0";
    iconImg.textContent = "❓";

    return;
    }

    location_name.textContent = data.name;
    weather_desc.textContent = data.weather[0].description;
    current_temp.textContent = data.main.temp;
    feelsLike.textContent = `${data.main.feels_like} °C`;
    humidity.textContent = `${data.main.humidity} %`;
    wind_speed.textContent = `${data.wind.speed} km/h`;

    const date = new Date((data.dt + data.timezone) * 1000);
    local_time.textContent = date.toUTCString().replace("GMT", "").slice(17, 22);

    const iconCode = data.weather[0].icon;
    console.log(iconCode)

    iconImg.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    iconImg.alt = data.weather[0].description;
    

}







const API_KEY = "5d6cde681ffff433849fac18c7882ee9";


async function getWeather(loca) {

    try{

        loadingSpinner.classList.remove("hidden");
        mainWeatherSection.classList.add("hidden");
        weatherDetailsSection.classList.add("hidden");
        location_header.classList.add("hidden");

        const response = await fetch (
            `https://api.openweathermap.org/data/2.5/weather?q=${loca}&appid=${API_KEY}&units=metric`
        );

        const data = await response.json();
    
        console.log(data);

        renderWeather(data);
    } 
    catch(error){
        console.log(error)
    }finally{

        loadingSpinner.classList.add("hidden");
        mainWeatherSection.classList.remove("hidden");
        weatherDetailsSection.classList.remove("hidden");
        location_header.classList.remove("hidden");

    }

};



search_btn.addEventListener("click", ()=> {
    const search_loca = search_input.value.trim();

    if (search_loca !== ""){
        getWeather(search_loca);
        search_input.value = "";
    }
});