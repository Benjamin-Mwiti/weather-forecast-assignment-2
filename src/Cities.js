import React, { useState, useEffect, useContext, useRef } from 'react';
import './Cities.css';
import { WeatherStatsContext } from './Main';
import { actionType } from './Reducer';
import { useStateValue } from './StatsProvider';
import $ from 'jquery';
import { Plus } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

export const CityID = React.createContext();

function Cities() {

    const [{}, dispatch] = useStateValue();
    const citiesWeatherStats = useContext(WeatherStatsContext);
    const clickRef = useRef();
    const [current_Page, setCurrent_Page] = useState(1);
    const stats_Per_Page = 3;
    const lastCityIndex = current_Page * stats_Per_Page;
    const firstCityIndex = lastCityIndex - stats_Per_Page;
    const currentStats = citiesWeatherStats.slice(firstCityIndex, lastCityIndex);
    const page_Numbers = [];

    $(function() {
        currentStats.length > 2
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

    // Pagination
    for(let i = 1; i <= Math.ceil(citiesWeatherStats.length / stats_Per_Page); i++) {
        page_Numbers.push(i)
    }
    // Pagination
    const paginate = pageNumber => setCurrent_Page(pageNumber);
    
    useEffect(() => {
        const getID = stats => {
            dispatch({
                type: actionType.set_Stats,
                stats: stats
            });
        }
        clickRef.current = getID;
    }, []);

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
                            <div className="city__weatherInfo" key={ stats.id } onClick={ () => clickRef.current(stats) }>
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
