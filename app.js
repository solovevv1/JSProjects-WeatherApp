window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let locationCountry = document.querySelector('.location-country');
    let locationCity = document.querySelector('.location-city');
    let weatherIcon = document.querySelector('.weather-icon');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            // const proxy = 'https://cors-anywhere.herokuapp.com/';
            api = `http://api.weatherapi.com/v1/current.json?key=bc391153ff3e439085e123727230305&q=${lat},${long}&aqi=yes`;
            
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const { temp_c } = data.current;
                    const { text, icon } = data.current.condition;
                    const { localtime, country, name } = data.location;
                    //Set DOM elements from API
                    temperatureDegree.textContent = temp_c;
                    temperatureDescription.textContent = text;
                    locationTimezone.textContent = localtime;
                    locationCountry.textContent = country;
                    locationCity.textContent = name;
                    weatherIcon.outerHTML = `<img src="${icon}" alt="">`;
                })
        })
    }
});