import React, { useState, useEffect, useContext } from 'react';
import './Main.css';
import Cities from './Cities';
import CurrentLocation from './CurrentLocation';
import { useStateValue } from './StatsProvider';
// import FetchingData from "./FetchingData";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import $ from 'jquery';
import { CaretDownFill } from 'react-bootstrap-icons';

export const WeatherStatsContext = React.createContext();

function Main() {

  const [city_Weather_Stats, setCity_Weather_Stats] = useState();
  const [city_Name, setCity_Name] = useState("");
  const [{ stats }, dispatch] = useStateValue();
  const visitedCitiesIDs = [];
  const [visitedCitiesCount, setvisitedCitiesCount] = useState(0);
  console.log(stats);
  // console.log(city_Weather_Stats);
  // const [cityID] = useParams();
  // console.log("City name: " + city_Name);
  // console.log(weather_Stats);

  const currentCityWeatherInfo = document.querySelector('.currentCityWeatherInfo');
  const searchedWeatherInfo = document.querySelector('.searchedWeatherInfo');
  
/*
 * Put the Cities' weather stats in an array named city_Weather_Stats
 * Loop through the array in Cities.js to display the stats of each City in the array
 */

  const appID = "1cc7ad57a30f3ba7be0d6a9766a69562";
  const openWeatherMapURL = `http://api.openweathermap.org/data/2.5/find?q=${city_Name}&units=metric&appid=${appID}`;

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
        
        // If the input field is empty, the API is not called
        if(city_Name !== "") {
          getOpenWeatherMapData()
              .then(fectchedData => {
                setCity_Weather_Stats(fectchedData.list);
              })
              .catch((error) => {
                  console.log(error)
              });
        }
    });
/* let visitedCityID = visitedCitiesIDs.map( e => ( e ));
      let weatherStatsID = weather_Stats.map( e => ( e ));
      if (visitedCityID !== weatherStatsID) {
        visitedCitiesIDs.push(weather_Stats.id);
        setvisitedCitiesCount(visitedCitiesCount + 1);
      } */
  
    return () => {
        isMounted = false;
    }
  }, [city_Name]);

  return (
    <Router>
      <div className="main">
        <div className="main__bar">
          <div className="main__title">
            <div className="title">
              <Link to='/'>
                <strong>Home</strong>
              </Link>
            </div>
            <div className="title">
              <span>
                <strong>Visited Cities</strong>
                <span className="caret__icon">
                  <CaretDownFill />
                </span>
              </span>
              <div className="cities__visited">
                { visitedCitiesCount }
              </div>
            </div>
          </div>
          <div className="search__container">
            <form onSubmit={ e => e.preventDefault() }>
              <input type="search" name="city-name" 
                value={ city_Name }
                placeholder="Name of your city" 
                onChange = { e => setCity_Name(e.target.value) } 
              />
              <Link to={`/${city_Name}`} >
                <button id="button" type="submit" 
                onClick={ () => {
                  for(let VCID = 0; VCID < visitedCitiesIDs.length; VCID++) {
                    /* if (visitedCitiesIDs[VCID] !== weather_Stats.id) {
                      visitedCitiesIDs.push(city_ID);
                      console.log("visitedCitiesIDs: " + visitedCitiesIDs);
                    } */
                    setvisitedCitiesCount(visitedCitiesCount + 1);
                  /* let visitedCityID = visitedCitiesIDs.map( e => ( e ));
                  let weatherStatsID = weather_Stats.map( e => ( e ));
                  if (visitedCityID !== weatherStatsID) {
                    visitedCitiesIDs.push(weather_Stats.id);
                    setvisitedCitiesCount(visitedCitiesCount + 1);
                  } */
                  }
                  setCity_Name("");
                }} >Search</button>
              </Link>
            </form>
          </div>
        </div>
        <div className="main__body">
          <div className="currentCityWeatherInfo">
            <Switch>
              <Route path="/" exact component={ CurrentLocation } />
              <WeatherStatsContext.Provider value={ city_Weather_Stats } >
                <Route path={`/${city_Name}`} component={ Cities } />
              </WeatherStatsContext.Provider>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default Main;
