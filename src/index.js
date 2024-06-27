import './style.css';


const APIKey = '0066e5f307d24bb8881194244242606'; 
const LocationInputElement = document.getElementById('locationInput');
const SearchButtonElement = document.getElementById('searchButton'); 
const divElement = document.getElementById('textDiv'); 
const imgElement = document.querySelector('img');


async function loadJson(location, APIKey){
    try{
        let url = 'http://api.weatherapi.com/v1/current.json?key='+ APIKey + '&q='+ location + '&aqi=yes'; 
        let response = await fetch(url); 
        if (!response.ok) {
            alert("cette localité n'existe pas"); 
            throw new Error(`il y a une erreur de statut : ${response.status}`);
        }
        let json = await response.json();
        return json; 
    } catch(err) {
        console.log(err);
      }
}

async function loadImage (){
    let url = 'https://api.giphy.com/v1/gifs/translate?api_key=Esw8v4wRljuoUEblbTuNpooxyKiJLgvR&s='+getLocation();
    fetch(url, {mode: 'cors'})
    .then(function(response) {
    return response.json();
    })
    .then(function(response) {
        imgElement.src = response.data.images.original.url;
    })
    .catch(function(error){
        console.log(error); 
    });
}

function getLocation(){
    let location = LocationInputElement.value; 
    return location;
}

SearchButtonElement.addEventListener('click', () =>{
    console.log(getLocation()); 
   /* console.log(loadJson(getLocation(), APIKey)); */
    showWeatherData(); 
})

async function showWeatherData(){
    try{
    let json = await loadJson(getLocation(), APIKey); 
    let tempC = json.current.temp_c; 
    let weatherDescription = json.current.condition.text; 
    let frase = 'The temperature in ' + getLocation() + ' is ' + tempC + '°C, it is ' + weatherDescription; 
    divElement.textContent = frase; 
    loadImage(); 
    } catch (error){
        console.log(error); 
    }
}




