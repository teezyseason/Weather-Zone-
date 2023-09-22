const container = document.querySelector('.container');
const search = document.querySelector('.search-container button');
const weatherContainer = document.querySelector('.weather-container');
const weatherDetails = document.querySelector('.weather-details');
const errorNotFound = document.querySelector('.not-found');

search.addEventListener('click', () => {
  const APIKey = '4ea3e8f169a69fe381e34b1edaccff93';
  const city = document.querySelector('.search-container input').value;

  if (city === '') return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === '404') {
        container.style.height = '400px';
        weatherContainer.style.display = 'none';
        weatherDetails.style.display = 'none';
        errorNotFound.style.display = 'block';
        errorNotFound.classList.add('fadeIn');
        return;
      }

      errorNotFound.style.display = 'none';
      errorNotFound.classList.remove('fadeIn');

      const image = document.querySelector('.weather-container img');
      const temperature = document.querySelector(
        '.weather-container .temperature'
      );
      const description = document.querySelector(
        '.weather-container .description'
      );
      const humidity = document.querySelector(
        '.weather-details .humidity span'
      );
      const wind = document.querySelector('.weather-details .wind span');

      switch (json.weather[0].main) {
        case 'Clear':
          image.src = 'img/clear.png';
          break;
        case 'Rain':
          image.src = 'img/rain.png';
          break;
        case 'Snow':
          image.src = 'img/snow.png';
          break;
        case 'Clouds':
          image.src = 'img/cloud.png';
          break;
        case 'Haze':
          image.src = 'img/mist.png';
          break;

        default:
          image.src = '';
      }
      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}km/h`;

      weatherContainer.style.display = '';
      weatherDetails.style.display = '';
      weatherContainer.classList.add('fadeIn');
      weatherDetails.classList.add('fadeIn');
      container.style.height = '400px';
    });
});
