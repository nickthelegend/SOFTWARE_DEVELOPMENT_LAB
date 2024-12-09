const apiKey = "7585c8a0c69d063e41587d5d9e7bcc37"; // Replace with your OpenWeatherMap API key
const fetchButton = document.getElementById("fetchWeather");
const cityInput = document.getElementById("cityInput");
const ctx = document.getElementById("weatherChart").getContext("2d");

// Function to fetch weather data using async/await
const fetchWeatherData = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("City not found");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        alert(error.message);
    }
};

// Function to process data and create chart
const createWeatherChart = (data) => {
    const labels = data.list.map((item) => item.dt_txt); // Date and time labels
    const temperatures = data.list.map((item) => item.main.temp); // Temperature values

    // Display graph using Chart.js
    new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Temperature (°C)",
                    data: temperatures,
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true,
            scales: {
                x: { display: true, title: { display: true, text: "Time" } },
                y: { display: true, title: { display: true, text: "Temperature (°C)" } },
            },
        },
    });
};

// Event listener for button click
fetchButton.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) {
        alert("Please enter a city name");
        return;
    }

    // Fetch data and create chart
    const weatherData = await fetchWeatherData(city);
    if (weatherData) createWeatherChart(weatherData);
});
