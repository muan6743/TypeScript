document.addEventListener("DOMContentLoaded", () => {
    const locationInput = document.getElementById("location") as HTMLInputElement;
    const getWeatherButton = document.getElementById("get-weather") as HTMLButtonElement;
    const temperatureElement = document.getElementById("temperature") as HTMLParagraphElement;
    const humidityElement = document.getElementById("humidity") as HTMLParagraphElement;
    const descriptionElement = document.getElementById("description") as HTMLParagraphElement;

    getWeatherButton.addEventListener("click", () => {
        const location = locationInput.value.trim();

        if (location === "") {
            alert("Please enter a location.");
            return;
        }

        fetchWeatherData(location)
            .then((weatherData) => {
                temperatureElement.textContent = `Temperature: ${weatherData.temperature}°C`;
                humidityElement.textContent = `Humidity: ${weatherData.humidity}%`;
                descriptionElement.textContent = `Description: ${weatherData.description}`;
            })
            .catch((error) => {
                console.error("Error fetching weather data:", error);
                alert("Error fetching weather data. Please try again.");
            });
    });

    interface WeatherData {
        temperature: number;
        humidity: number;
        description: string;
    }

    async function fetchWeatherData(location: string): Promise<WeatherData> {
        const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error("Weather data not found.");
            }

            const data = await response.json();

            return {
                temperature: data.main.temp,
                humidity: data.main.humidity,
                description: data.weather[0].description,
            };
        } catch (error) {
            throw error;
        }
    }
});
