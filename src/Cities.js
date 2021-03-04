import React, { useState, useEffect, useContext } from 'react';
import './Cities.css';
import Main, { CityNameContext } from './Main';
// import Pagination from './Pagination';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';

export const CityCountContext = React.createContext();
export const CityIdContext = React.createContext();
export const IdenticalCitiesContext = React.createContext();

function Cities() {

    const [weather_Stats, setWeather_Stats] = useState({});
    const [city_ID, setCity_ID] = useState();
    const [search_ID, setSearch_ID] = useState();
    const [recently_Viewed, setRecently_Viewed] = useState();
    const [totalIdenticalCities, setTotalIdenticalCities] = useState([]);
    const [country_Name, setCountry_Name] = useState("");
    const [city_Count, setCity_Count] = useState(0);

    const cityName = useContext(CityNameContext);
    const appID = "1cc7ad57a30f3ba7be0d6a9766a69562";
    /* const cities = document.querySelector('.city__weatherInfo');
    console.log(cities); */

    /* $(function() {
        const cities = $('.city__weatherInfo');
        console.log(cities);
    }); */
    
    const openWeatherMapURL = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${appID}`;
    // const openWeatherMapFlag = `http://openweathermap.org/images/flags/${country_Name.toLowerCase()}.png`;
    // console.log(openWeatherMapURL);

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
                /* const result = (await fetch(openWeatherMapURL)).json();
                return result; */
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
    }, [cityName]);

    return (
        <div className="cities">
            <CityCountContext.Provider value={ city_ID }>
                <Main />
            </CityCountContext.Provider>
            {/* <CityCountContext.Provider value={ city_Count }>
                <IdenticalCitiesContext.Provider value={ totalIdenticalCities }>
                    // <Pagination />
                </IdenticalCitiesContext.Provider>
            </CityCountContext.Provider> */}
            <div className="city__weatherInfo">
                <h1>Your City</h1>
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
    )
}

export default Cities;

/* $(function() {
    $('.city__weatherInfo').html(`<p>${data.name}, ${data.sys.country}</p><p>Feels like ${data.main.feels_like} <sup>o</sup>C ${data.weather[0].description}.${data.weather[0].main}</p><p><img src=http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png />${data.main.temp}</p>`);
}); */

