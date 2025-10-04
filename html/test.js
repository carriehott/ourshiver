

    <script>
        const LAT = 37.7749;  // Replace with your latitude
        const LON = -122.4194; // Replace with your longitude
        const API_KEY = "your_openweathermap_api_key"; // OpenWeatherMap API key

        // ✅ Function to update time & date
        function updateTimeAndDate() {
            const now = new Date();
            document.getElementById("local-time").innerText = now.toLocaleTimeString();
            document.getElementById("local-date").innerText = now.toLocaleDateString();
        }

        // ✅ Function to fetch sunrise & sunset
        async function fetchSunTimes() {
            try {
                let response = await fetch(`https://api.sunrise-sunset.org/json?lat=${LAT}&lng=${LON}&formatted=0`);
                let data = await response.json();

                if (data.status === "OK") {
                    let sunriseUTC = new Date(data.results.sunrise);
                    let sunsetUTC = new Date(data.results.sunset);

                    let sunriseLocal = sunriseUTC.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    let sunsetLocal = sunsetUTC.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                    document.getElementById("sunrise").innerHTML = `<span class="label">🌅 Sunrise:</span> <span class="time">${sunriseLocal}</span>`;
                    document.getElementById("sunset").innerHTML = `<span class="label">🌇 Sunset:</span> <span class="time">${sunsetLocal}</span>`;
                } else {
                    document.getElementById("sunrise").innerText = "Sunrise API Error.";
                    document.getElementById("sunset").innerText = "Sunset API Error.";
                }
            } catch (error) {
                console.error("Sunrise API fetch failed:", error);
                document.getElementById("sunrise").innerText = "Error fetching sunrise data.";
                document.getElementById("sunset").innerText = "Error fetching sunset data.";
            }
        }

        // ✅ Function to fetch weather
        async function fetchWeather() {
            try {
                let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                let data = await response.json();

                let temp = Math.round(data.main.temp);
                let weatherDesc = data.weather[0].description;
                let icon = data.weather[0].icon;

                document.getElementById("weather").innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather icon"> ${weatherDesc}, ${temp}°C`;
            } catch (error) {
                console.error("Weather API fetch failed:", error);
                document.getElementById("weather").innerText = "Weather data error.";
            }
        }

        // ✅ Function to update all data
        function updateAll() {
            updateTimeAndDate();
            fetchSunTimes();
            fetchWeather();
        }

        // ✅ Ensure script runs after page load
        window.onload = function() {
            updateAll();
            setInterval(updateAll, 60000); // Update every 60 seconds
        };
    </script>