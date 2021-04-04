import './App.css';
import React, { useState } from 'react';

let api = {
  key: "d5d483e8405ac237ceaee3f997bea178",
  baseURL: "https://api.openweathermap.org/data/2.5/"
}

let tem;

function App() {

  let [input, setInput] = useState("");
  let [city, setCity] = useState("Delhi");
  let [country, setCountry] = useState("India");
  let [temp, setTemp] = useState("35");
  let [tempMax, setTempMax] = useState("45");
  let [tempMin, setTempMin] = useState("25");
  let [weatherType, setWeatherType] = useState("Sunny");

  function inputChange(e) {
    setInput(e.target.value)
  }

  function setQuery(e) {
    if (e.key == "Enter") {
      getResult(input);
    }
  }

  function getResult(val) {
    fetch(`${api.baseURL}weather?q=${val}&units=metric&appid=${api.key}`)
      .then(weather => {
        setInput("");
        return weather.json()
      })
      .then(displayResult).catch(() => { window.alert("Please Enter proper Input") })
  }

  function displayResult(weather) {
    tem = weather.main.temp;
    console.log(tem);
    console.log(typeof (tem))
    setCity(weather.name);
    setCountry(weather.sys.country)
    setTemp(weather.main.temp)
    setTempMax(weather.main.temp_max)
    setTempMin(weather.main.temp_min)
    setWeatherType(weather.weather[0].main)
  }

  let d = new Date();

  return (
    <div className={tem < 25 ? "App" : "warm"}>
      <main className="wrapApp">
        <div className="wrapper">
          <section className="head">
            <input id="input" className="search-box" placeholder="Select city..." type="text" value={input} onChange={inputChange} onKeyPress={setQuery} />
            <div className="country">{city}, {country}</div>
            <div className="date">{d.toDateString()}</div>
          </section>
          <section className="weather">
            <div className="temp">{temp} °C</div>
            <div className="weather-type">{weatherType}</div>
            <div className="high-low">{tempMin}°C / {tempMax}°C  </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
