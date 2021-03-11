import React, { useState, useEffect, useContext } from 'react';
import './Cities.css';
import { WeatherStatsContext } from './Main';
// import Pagination from './Pagination';
import $ from 'jquery';
import { Plus } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

export const CityCountContext = React.createContext();
export const IdenticalCitiesContext = React.createContext();

function Cities() {

    const citiesWeatherStats = useContext(WeatherStatsContext);
    // const [recently_Viewed, setRecently_Viewed] = useState([]);
    const [current_Page, setCurrent_Page] = useState(1);
    const recently_Viewed = [];
    const stats_Per_Page = 3;
    const lastCityIndex = current_Page * stats_Per_Page;
    const firstCityIndex = lastCityIndex - stats_Per_Page;
    const currentStats = citiesWeatherStats.slice(firstCityIndex, lastCityIndex);
    const page_Numbers = [];
    console.log(citiesWeatherStats);
    console.log(recently_Viewed);
    console.log("Recently viewed city IDs: " + recently_Viewed);

    $(function() {
        citiesWeatherStats.length > 2
        ? $('.city__stats__container').css('border-bottom', '.18em solid #9ec3e6')
        : $('.city__stats__container').css('border-bottom', 'none')
        $('.city__weatherInfo').click(function() {
            const cityWeatherInfo = document.querySelector('.weather__details');
            if(cityWeatherInfo.style.display === 'none') {
                $('.city__weatherInfo').animate({ height: '16em' }, 850);
                $('.weather__details').animate({display: 'flex'}, 600);
            } else {
                $('.city__weatherInfo').animate({ height: '8.2em' }, 850);
                $('.weather__details').animate({display: 'none'}, 600);
            }
        });
    });

    for(let i = 1; i <= Math.ceil(citiesWeatherStats.length / stats_Per_Page); i++) {
        page_Numbers.push(i)
    }

    const paginate = pageNumber => setCurrent_Page(pageNumber);

    // Use a function for pushing the IDs outside the return function and reference it passing the stats as its parameter
    // let viewedID;
    /* recently_Viewed.map(view => (
        stats.id !== view
        ? recently_Viewed.push(stats.id)
        : console.log(`Failed to get ${stats.name}, ${ stats.sys.country } ID`)
        // return viewedID = view;
    )) */
    /* for(let i = 0; i < recently_Viewed.length; i++) {
        console.log(recently_Viewed[i]);
        if(stats.id !== recently_Viewed[i]) {
            recently_Viewed.push(stats.id);
            console.log(recently_Viewed[i]);
        } else {
            console.log(`Failed to get ${stats.name}, ${ stats.sys.country } ID`);
        }
    } */
    /* if(stats.id !== viewedID) {
        recently_Viewed.push(stats.id);
        console.log(viewedID);
    } else {
        console.log(`Failed to get ${stats.name}, ${ stats.sys.country } ID`);
    } */
    
    const getID = (stats) => {
        console.log(stats);
        recently_Viewed.map(view => (
            stats.id !== view
            ? recently_Viewed.push(stats.id)
            : console.log(`Failed to get ${stats.name}, ${ stats.sys.country } ID`)
        ))
        console.log(recently_Viewed);
    }
    

    return (
        <div className="cities">
            <ul className="pagination">
                <li className="page-item">
                    <Link to="#" className="page-link" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </Link>
                </li>
                    {
                        page_Numbers.map(number => (
                            <li className="page-item" key={ number }>
                                <Link to="#" className="page-link" onClick={ () => paginate(number) }>{ number }</Link>
                            </li>
                        ))
                    }
                <li className="page-item">
                    <Link to="#" className="page-link" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </Link>
                </li>
            </ul>
            <div className="city__stats__container">
                {
                    currentStats.map(  stats => {
                        return (
                            <div className="city__weatherInfo" key={ stats.id } onClick={ () => getID(stats) }>
                                <span>
                                    <img src={`http://openweathermap.org/images/flags/${stats.sys.country.toLowerCase()}.png`} width="20" alt="country flag"/>
                                    <strong>
                                        {`${ stats.name }, ${ stats.sys.country }`}
                                    </strong>
                                </span>
                                <span>
                                    {`Feels like ${ stats.main.feels_like } <sup>o</sup>C ${ stats.weather[0].description }. ${ stats.weather[0].main }`}
                                </span>
                                <span>
                                    <img src={`http://openweathermap.org/img/wn/${stats.weather[0].icon}@2x.png`} width="85" alt="weather icon" />
                                    <strong>{ stats.main.temp }</strong>
                                    <Plus className="plus__icon" />
                                </span>
                                <div className="weather__details">
                                    <span>
                                        <strong>{`Expect weather from ${stats.main.temp_min} to ${stats.main.temp_max} `}</strong>
                                    </span>
                                    <span>
                                        <strong>{`Sunrise: ${stats.sys.sunrise} a.m. Sunset: ${stats.sys.sunset} p.m. `}</strong>
                                    </span>
                                    <span>
                                        <strong>{`Clouds: ${stats.weather[0].description} Humidity: ${stats.main.humidity}% Pressure: ${stats.main.pressure} hPa `}</strong>
                                    </span>
                                    <span>
                                        <strong>{`Wind: ${stats.wind.speed} m/s ${stats.wind.deg} `}</strong>
                                    </span>
                                    <span>
                                        <strong>{`Geo Location: ${stats.coord.lat}, ${stats.coord.lon} `}</strong>
                                    </span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Cities;
