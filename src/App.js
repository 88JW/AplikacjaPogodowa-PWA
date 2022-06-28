import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&lang=pl&units=metric&appid=cbdc03bcf6578ceae466d737754fc574`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        // console.log(response.data);
      });
      searchLocation("");
    }
  };

  return (
    <div className=" app">
      <div className="container">
        <div className="search">
          <input
            className="search-box"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Wpisz miasto..."
            onKeyPress={searchLocation}
            type="text"
          />
        </div>

        {data.name != undefined && (
          <div className="top">
            <div className="location">
              <h1>{location}</h1>
              <img
                className="weather--icon"
                src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
              />
            </div>
            <div className="weather-box1">
              <div className="temp">
                {data.main ? <p>{data.main.temp.toFixed()}°C</p> : null}
              </div>
              <div className="description">
                {data.weather ? <p>{data.weather[0].description}</p> : null}
              </div>
            </div>
          </div>
        )}
        {data.name != undefined && (
          <div className="bottom">
            <div className="humidity">
              <p>
                {data.clouds ? <p>Zachmurzenie: {data.clouds.all} %</p> : null}
              </p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p>Prędkość wiatru: {data.wind.speed.toFixed()} m/s</p>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default App;
