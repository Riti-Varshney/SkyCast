async function getWeather() {
    const location = document.getElementById('locationInput').value;
    const resultDiv = document.getElementById('weatherResult');

    if (!location) {
      resultDiv.innerHTML = "Please enter a location.";
      return;
    }

    const apiKey = "f85bff66c0ff474d8b9191018252004";
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

    try {
      const response = await fetch(url);
    //it will send request to the API // await pauses execution untill a response comes  
      const data = await response.json();
    // converts the API response (JSON format) into a JavaScript object.
    //{learn.txt}
      if (data.error) {
        resultDiv.innerHTML = `Error: ${data.error.message}`;
      } else {
        const temp = data.current.temp_c;
        const condition = data.current.condition.text;
        const icon = data.current.condition.icon;
        const hum = data.current.humidity;
        const wind = data.current.wind_kph;
        const update=data.current.last_updated;

        resultDiv.innerHTML = `
          <p><strong>Location:</strong> ${data.location.name}, ${data.location.country}</p>
          <p><strong>Temperature:</strong> ${temp}°C</p>
          <p><strong>Condition:</strong> ${condition}</p>
          <p><strong>Humidity:</strong> ${hum}</p>
          <p><strong>Wind(km/h):</strong> ${wind}</p>
          <p><strong>Last Updates:</strong> ${update}</p>
          <img src="https:${icon}" alt="weather icon">
        `;
      }
    } catch (error) {
      resultDiv.innerHTML = "Something went wrong. Please try again later.";
      console.error(error);
    }
  }