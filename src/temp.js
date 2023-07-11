import React, { useEffect, useState } from "react";
import "./temp.css";
import WeatherCard from "./weatherCard";
const Temp = () => {
  const [searchValue, SetSearchValue] = useState("Delhi");
  const [tempInfo, setTempInfo] = useState({});
  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=5d4318a3b6e4b2031a1286cf48f1c138`;
      let res = await fetch(url);
      let data = await res.json();
      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;
      const myNewWeather = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };
      setTempInfo(myNewWeather);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getWeatherInfo();
  });

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            className="searchTerm"
            placeholder="Search"
            id="search"
            autoFocus
            value={searchValue}
            onChange={(e) => SetSearchValue(e.target.value)}
          />
          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}
          >
            Search
          </button>
        </div>
      </div>
      <WeatherCard tempInfo={tempInfo} />
    </>
  );
};

export default Temp;
