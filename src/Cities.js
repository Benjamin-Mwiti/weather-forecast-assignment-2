import React, { useState, useEffect, useContext } from 'react';
import './Cities.css';
import { WeatherStatsContext } from './Main';
// import Pagination from './Pagination';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';

export const CityCountContext = React.createContext();
export const IdenticalCitiesContext = React.createContext();

function Cities() {

    const [country_Flag, setCountry_Flag] = useState();
    const [search_ID, setSearch_ID] = useState();
    const [recently_Viewed, setRecently_Viewed] = useState();
    const [totalIdenticalCities, setTotalIdenticalCities] = useState([]);
    const [country_Name, setCountry_Name] = useState("");
    const [city_Count, setCity_Count] = useState(0);
    const citiesWeatherStats = useContext(WeatherStatsContext);
    console.log(citiesWeatherStats);
    // console.log(weatherStats);
    // const countryName = weatherStats.sys.country;
    // console.log("Country Flag: " + country_Flag);
    
    // console.log("Cities country name: " + countryName);
    // console.log("Cities country name from weatherStats: " + weatherStats.sys.country);

    // const openWeatherMapFlag = `http://openweathermap.org/images/flags/${countryName.toLowerCase()}.png`;
    // console.log(openWeatherMapFlag);

    const cityWeatherStats = citiesWeatherStats.map( e => console.log(e)  );
    console.log(cityWeatherStats);

    useEffect(() => {
        let isMounted = true;
        const getCountryFlag = async () => {
            let response = await $.ajax({
                // url: openWeatherMapFlag,
                type: "GET",
                dataType: "json",
                success: data => {
                    return data;
                },
                error: (err) => {
                    console.log(err);
                }
            });
            return response;
        }
        /* getCountryFlag()
            .then( fetchedFlag => {
                console.log(fetchedFlag);
                setCountry_Flag(fetchedFlag);
            })
            .catch( error => console.log(error)) */
        return () => {
            isMounted = false;
        }
    }, [])

    return (
        <div className="cities">
            {/* <CityCountContext.Provider value={ city_Count }>
                <IdenticalCitiesContext.Provider value={ totalIdenticalCities }>
                    // <Pagination />
                </IdenticalCitiesContext.Provider>
            </CityCountContext.Provider> */}
            {
                citiesWeatherStats.map(  stats => {
                    return (
                        <div className="city__weatherInfo">
                            <p>
                                <img src='"http://openweathermap.org/images/flags/" + countryName.toLowerCase() + ".png"' alt=""/>
                                <strong>
                                    {`${ stats.name }, ${ stats.sys.country }`}
                                </strong>
                            </p>
                            <p>
                                {`Feels like ${ stats.main.feels_like } <sup>o</sup>C ${ stats.weather[0].description }.${ stats.weather[0].main }`}
                            </p>
                            <p>
                                {`<img src=http://openweathermap.org/img/wn/${stats.weather[0].icon}@2x.png /> `}
                                <strong>{ stats.main.temp }</strong>
                            </p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Cities;
