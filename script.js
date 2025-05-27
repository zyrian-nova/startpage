// Set Date

function displayDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const dateElements = document.querySelectorAll('.date');
    dateElements.forEach(el => el.textContent = `${year}-${month}-${day}`);
}


// Set time 
var oldTime;

function setTime() {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: 'numeric',
        minute: 'numeric'
    });

    if (oldTime === time) return;

    oldTime = time;
    const [hours, minutes] = time.split(':');
    document.querySelector('#hours').innerText = hours.padStart(2, '0');
    document.querySelector('#minutes').innerText = minutes.padStart(2, '0');
}

// Get weather

async function fetchWeather() {
    const iconEl = document.getElementById('weather-icon');
    const tempEl = document.getElementById('weather-temp');
    const descEl = document.getElementById('weather-desc');

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&appid=${API_KEY}`);
        if (!response.ok) throw new Error('API error');

        const data = await response.json();
        const description = capitalize(data.weather[0].description);
        const temp = Math.round(data.main.temp);
        const iconCode = data.weather[0].icon;

        iconEl.src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
        iconEl.alt = description;
        tempEl.textContent = `${temp}°C`;
        descEl.textContent = `${description}`;

    } catch (error) {
        console.error('Weather fetch error:', error);
        tempEl.textContent = '--';
        descEl.textContent = 'Weather unavailable';
        iconEl.style.display = 'none';
    }
}

function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

// Load page

document.addEventListener('DOMContentLoaded', function() {
    displayDate();
    setTime();
    fetchWeather();

    setInterval(setTime, 1000);
    setInterval(fetchWeather, 900000)
});