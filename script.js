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
        minute: 'numeric',
        second: 'numeric'
    });

    if (oldTime === time) return;

    oldTime = time;
    const [hours, minutes, seconds] = time.split(':');
    document.querySelector('#hours').innerText = hours.padStart(2, '0');
    document.querySelector('#minutes').innerText = minutes.padStart(2, '0');
    document.querySelector('#seconds').innerText = seconds.padStart(2, '0');
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

// Get International News

async function fetchInternationalNews() {
    try {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?language=en&pageSize=1&apiKey=${NEWS_API_KEY}`);

        // Response OK
        if (!response.ok) {
            console.error("HTTP error:", response.status, response.statusText);
            document.getElementById('news-intl-title').textContent = "API Error.";
            return;
        }

        let data;
        try {
            data = await response.json();
        } catch (jsonError) {
            console.error("JSON parse error:", jsonError);
            document.getElementById('news-intl-title').textContent = "Invalid response.";
            return;
        }

        console.log("DATA TYPE:", typeof data, "DATA CONTENT:", data);

        if (!data || data.status !== "ok" || !Array.isArray(data.articles) || data.articles.length === 0) {
            console.warn("No articles available or API error:", data);
            document.getElementById('news-intl-title').textContent = "No available news.";
            return;
        }

        const article = data.articles[0];

        if (!article || !article.title || !article.url) {
            console.warn("Article incomplete:", article);
            document.getElementById('news-intl-title').textContent = "Incomplete news.";
            return;
        }

        document.getElementById('news-intl-title').textContent = article.title;
        document.getElementById('news-intl-link').href = article.url;

    } catch (error) {
        console.error("Error fetching international news:", error);
        document.getElementById('news-intl-title').textContent = "Conection error.";
    }
}

// Get Tech News

async function fetchTechNews() {
    try {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?category=technology&language=en&pageSize=1&apiKey=${NEWS_API_KEY}`);

        // Response OK
        if (!response.ok) {
            console.error("HTTP error:", response.status, response.statusText);
            document.getElementById('news-intl-title').textContent = "API Error.";
            return;
        }

        let data;
        try {
            data = await response.json();
        } catch (jsonError) {
            console.error("JSON parse error:", jsonError);
            document.getElementById('news-intl-title').textContent = "Invalid response.";
            return;
        }

        console.log("DATA TYPE:", typeof data, "DATA CONTENT:", data);

        if (!data || data.status !== "ok" || !Array.isArray(data.articles) || data.articles.length === 0) {
            console.warn("No articles available or API error:", data);
            document.getElementById('news-intl-title').textContent = "NNo available news.";
            return;
        }

        const article = data.articles[0];

        if (!article || !article.title || !article.url) {
            console.warn("Article incomplete:", article);
            document.getElementById('news-intl-title').textContent = "Incomplete news.";
            return;
        }

        document.getElementById('news-intl-title').textContent = article.title;
        document.getElementById('news-intl-link').href = article.url;

    } catch (error) {
        console.error("Error fetching international news:", error);
        document.getElementById('news-intl-title').textContent = "Conection error.";
    }
}

// Load page

document.addEventListener('DOMContentLoaded', function() {
    displayDate();
    setTime();
    fetchWeather();
    fetchInternationalNews();
    fetchTechNews();

    setInterval(setTime, 1000);
    setInterval(fetchWeather, 900000)
});
