import React, { useState } from 'react';

const apiBase = "https://api.openweathermap.org/data/2.5/";
const apiKey = process.env.REACT_APP_API_KEY;

function App() {
  const[query, setQuery] = useState('');
  const[weather,setWeather] = useState({});
  const search = e => {
    if (e.key === "Enter"){
      fetch(`${apiBase}weather?q=${query}&units=imperial&APPID=${apiKey}`)
        .then(res=> res.json())
        .then(result => {
          setWeather(result)
          setQuery('');
          console.log(result);
        });
    }
  }
  const dateBuilder = (d) => {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = String(new window.Date())
    date = date.slice(3,15)

    return `${day}, ${date}`
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 70) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search"
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />  
        </div> 
        {(typeof weather.main != "undefined") ? (
        <div>
          <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
              alt="weather status icon"
              className="weather-icon"
            />  
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°F
            </div>
            
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
