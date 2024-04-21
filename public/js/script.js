


document.addEventListener("DOMContentLoaded", function () {

    const search_btn = document.getElementById('search_btn');
    const city_name = document.getElementById('city_name');
    const output = document.getElementById('output');
    const output_date = document.getElementById('output_date');
    const today_month = document.getElementById('today_month');
    const today_day = document.getElementById('today_day');
    const today_weather = document.getElementById('today_weather');
    const today_temperature = document.getElementById('today_temperature');
    const today_city = document.getElementById('today_city');

    today_month.innerText = "";
    today_day.innerText ="" ;
    today_temperature.innerText = "";
    today_weather.innerText = "";
    today_city.innerText = "";

    search_btn.onclick = async () => {
        output.innerText = ""; // Clear previous output
        output.innerText = "Searching..."; // Provide immediate feedback to the user

        let city_value = city_name.value.trim(); // Trim leading and trailing whitespaces

        if (city_value === "") {
            output.innerText = "Please enter a city name";
        } else {
            try {
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city_value)}&units=metric&appid=a626b25d4669308ab61c48ab826ec168`;
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error('Weather data not found');
                }

                const data = await response.json();

                // Determine the appropriate CSS class based on weather condition
                let weatherClass = '';
                switch (data.weather[0].main.toLowerCase()) {
                    case 'clear':
                        weatherClass = 'clear-sky';
                        output.classList.add(weatherClass);
                        break;
                    case 'clouds':
                        weatherClass = 'clouds';
                        output.classList.add(weatherClass);
                        break;
                    case 'smoke':
                        weatherClass = 'smoke';
                        break;
                    // Add more cases for other weather conditions as needed
                    default:
                        // Default class if no match is found
                        weatherClass = 'default-icon';
                        output.classList.add(weatherClass);
                        break;
                }
                // Add the CSS class to the output element
                output.classList.add(weatherClass);

                // Fetch current date and display it
                const currentDate = new Date();
                const day = currentDate.getDate();
                const month = currentDate.toLocaleString('default', { month: 'long' }); // Get full month name

       

                today_month.innerText = `${month}`;
                today_day.innerText = `${day}`;
                today_temperature.innerText = `${data.main.temp}°C`;
                today_weather.innerText = `${data.weather[0].description}`;
                today_city.innerText = `${data.name}`;

                output.innerHTML = "<i style='color:blue'>SkyFrost Weather</i>";

                // Process data and update UI with weather information
                // output.innerText = `Weather in ${data.name}: ${data.weather[0].description}, Temperature: ${data.main.temp}°C`;
            } catch (error) {
                output.innerText = "Error - City Not Found";
                today_month.innerText = "";
                today_day.innerText ="" ;
                today_temperature.innerText = "";
                today_weather.innerText = "";
                today_city.innerText = "";
           
            }
        }
    };

});
