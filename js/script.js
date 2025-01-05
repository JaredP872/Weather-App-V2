const apiKey = "25c05b3408fd297cc00de9b0de03278b";
const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");

searchBtn.addEventListener("click", async () => {
  // Trims any extra space within the users input
  const city = cityInput.value.trim();
  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  //   Construct the API URL before making any fetch calls
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&units=imperial&appid=${apiKey}`;

  //   Log the constructed URL for debugging
  console.log("Constructed URL:", url);

  try {
    // Fetch weather data
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log("API Response:", data); // Log the API response for debuging

    // Handle "city not found" errors
    if (data.cod === "404") {
      alert(`City not found: ${city}`);
      return;
    }

    // Update weather info
    cityName.textContent = data.name;
    temperature.textContent = `Temperature: ${data.main.temp}°F`;
    description.textContent = `Weather: ${data.weather[0].description}`;

    // Update background based on weather condition
    const weatherCondition = data.weather[0].main.toLowerCase();

    if (weatherCondition.includes("cloud")) {
      document.body.style.backgroundImage =
        "url('images/clouds_from_above.jpeg')";
      document.documentElement.style.height = "100%"; // Set html to 100% height
      document.body.style.height = "100%"; // Set body to 100% height
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundSize = "cover"; // Scale to cover the entire page
      document.body.style.backgroundPosition = "center"; // Center the image
    } else if (weatherCondition.includes("rain")) {
      document.body.style.backgroundImage = "url('images/Top-rain-fall.jpg')";
      document.documentElement.style.height = "100%"; // Set html to 100% height
      document.body.style.height = "100%"; // Set body to 100% height
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundSize = "cover"; // Scale to cover the entire page
      document.body.style.backgroundPosition = "center"; // Center the image
    } else if (weatherCondition.includes("clear")) {
      document.body.style.backgroundImage =
        "url('images/beautiful-sunny-day.jpg')";
      document.documentElement.style.height = "100%"; // Set html to 100% height
      document.body.style.height = "100%"; // Set body to 100% height
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundSize = "cover"; // Scale to cover the entire page
      document.body.style.backgroundPosition = "center"; // Center the image
    } else if (weatherCondition.includes("snow")) {
      document.body.style.backgroundImage = "url('images/snow-day-pic.jpg')";
      document.documentElement.style.height = "100%"; // Set html to 100% height
      document.body.style.height = "100%"; // Set body to 100% height
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundSize = "cover"; // Scale to cover the entire page
      document.body.style.backgroundPosition = "center"; // Center the image
    } else {
      document.body.style.backgroundColor = "#6D72C3";
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert(`something went wrong. Please try again.`);
  }
});
