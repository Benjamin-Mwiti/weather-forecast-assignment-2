import React, { useState, useEffect, useContext } from 'react';
import './Main.css';
import Cities, { CityIdContext } from './Cities';
import CurrentLocation from './CurrentLocation';
// import FetchingData from "./FetchingData";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';

export const CityNameContext = React.createContext();

function Main() {

  const [city_Name, setCity_Name] = useState();
  const [city_ID, setCity_ID] = useState();
  const [weather_Stats, setWeather_Stats] = useState({});
  console.log(city_Name);

  const windowLocation = `http://localhost:3000/?city+name=${city_Name}`;
  const currentWindowLocation = window.location.href;
  const cityWindowLocation = currentWindowLocation + city_Name;
  const currentCityWeatherInfo = document.querySelector('.currentCityWeatherInfo');
  const searchedWeatherInfo = document.querySelector('.searchedWeatherInfo');
  console.log(currentWindowLocation);
  
  const appID = "1cc7ad57a30f3ba7be0d6a9766a69562";
  const openWeatherMapURL = `http://api.openweathermap.org/data/2.5/weather?q=${city_Name}&units=metric&appid=${appID}`;
  // const openWeatherMapFlag = `http://openweathermap.org/images/flags/${country_Name.toLowerCase()}.png`;
  // console.log(openWeatherMapURL);

  if (currentWindowLocation === windowLocation) {
    $(function() {
      $(currentCityWeatherInfo).css('display', 'none');
      $(searchedWeatherInfo).css('display', 'flex');
    });
  } else {
    $(function() {
      $(currentCityWeatherInfo).css('display', 'flex');
      $(searchedWeatherInfo).css('display', 'none');
    });
  }

  useEffect(() => {
      let isMounted = true;

      $(function() {
          const getOpenWeatherMapData = async () => {
              let response = await $.ajax({
                  url: openWeatherMapURL,
                  type: "GET",
                  dataType: "json",
                  success: function(data) {
                      return data;
                  },
                  error: (err) => {
                      console.log(err);
                  }
              });
              return response;
          }
          getOpenWeatherMapData()
              .then(fectchedData => {
                  setWeather_Stats(fectchedData);
                  setCity_ID(fectchedData.id);
                  console.log(fectchedData);
                  console.log(fectchedData.id);
              })
              .catch((error) => {
                  console.log(error)
              });
      });
      return () => {
          isMounted = false;
      }
  }, [city_Name]);

  return (
    <div className="main">
      <div className="main__bar">
        <div className="main__title">
          <span><strong>Home</strong></span>
          <span><strong>Visited Cities</strong></span>
        </div>
        <div className="search__container">
          <form>
            <input type="search" name="city name" value={ city_Name } placeholder="Name of your city" 
              onChange = { e => {
                setCity_Name(e.target.value);
              }} />
            <button id="button" type="submit" >Search</button>
          </form>
        </div>
      </div>
      <div className="main__body">
        <div className="currentCityWeatherInfo">
          <CurrentLocation />
        </div>
        <div className="searchedWeatherInfo">
          {
            /* weather_Stats.map(weather_Stat => (
                <div>
                    <p>{ `${weather_Stat.name}` }</p>
                    <p>{ `Feels like ${weather_Stat.main.feels_like} <sup>o</sup>C ${weather_Stat.weather[0].description}.${weather_Stat.weather[0].main}` }</p>
                    <p>{ `<img src=http://openweathermap.org/img/wn/${weather_Stat.weather[0].icon}@2x.png />
                        ${weather_Stat.main.temp}` }
                    </p>
                </div>
            )) */
          }
        </div>
      </div>
    </div>
  )
}

export default Main;
