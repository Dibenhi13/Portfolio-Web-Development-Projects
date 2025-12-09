const apikey = "267ce7810dd957b056fc28ec23434514";

//HOGWARTS
const latitudHogwarts = 55.95119714853664;
const longitudHogwarts = -3.1944254065245437;

//LONDON
const latitudLondon = 51.506388273871636;
const longitudLondon = -0.12910761651126687;


function getWeather(latitud, longitud, selectorTemp, selectorCond) {
    fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + latitud + "&lon=" + longitud + "&units=metric&appid=" + apikey).then(recurso => recurso.json()).then(clima => {
        const descripcion = document.querySelector(selectorTemp);
        descripcion.innerHTML = Math.round(clima.main.temp) + "° C";
        
        const condition = document.querySelector(selectorCond);
        condition.innerHTML = clima.weather[0].main;
    });
}

getWeather(latitudHogwarts, longitudHogwarts, "#weatherHogwartsTemp", "#weatherHogwartsCond");
getWeather(latitudLondon, longitudLondon, "#weatherLondonTemp", "#weatherLondonCond");