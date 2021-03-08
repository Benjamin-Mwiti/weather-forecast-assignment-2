import React, { useState, useEffect } from 'react';
import './CurrentLocation.css';
import $ from 'jquery';

function CurrentLocation() {
    
    const [latLon, setLatLon] = useState([]);
    
    // console.log("Current location latitude: " + latLon[0]);
    // console.log("Current location latitude and longitude: " + latLon);

    useEffect(() => {
        let isMounted = true;
        async function getGeoCoords() {
            if(navigator.geolocation) {
                try {
                    let Location = await navigator.geolocation.getCurrentPosition(currentPosition => {
                        let Latitude = currentPosition.coords.latitude.toFixed(3);
                        let Longitude = currentPosition.coords.longitude.toFixed(3);
                        setLatLon([Latitude, Longitude]);
                    })
                    return Location;
                } catch(error) {
                    switch(error.code) {
                        case error.PERMISSION_DENIED:
                            alert("User denied the request for Geolocation.");
                            break;
                        case error.POSITION_UNAVAILABLE:
                            alert("Location information is unavailable.");
                            break;
                        case error.TIMEOUT:
                            alert("The request to get user location timed out.");
                            break;
                        case error.UNKNOWN_ERROR:
                            alert("An unknown error occurred.");
                            break;
                        default:
                            alert(error);
                    }
                }
            };
        }
        getGeoCoords()
            .then(response => {
                return response;
            })
            .catch(err => {
                console.error(err);
            });
        return () => {
            isMounted = false;
        }
    }, []);

    $(function() {
        const currentDate = new Date();
        const day = currentDate.getDay();
        const date = currentDate.getDate();
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
        
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        $('.currentLocation_forecast > span').eq(1).text(`${days[day]} ${date} ${months[month]} ${year}`);
    });

    return (
        <div className="currentLocation">
            <div className="currentLocation_forecast">
                <span>Toronto, CA</span>
                <span></span>
                <span>-15<span className="sup">0</span>C</span>
                <span>Cloudy</span>
                <span>-13<span className="sup">0</span>C / -16<span className="sup">0</span>C</span>
            </div>
        </div>
    )
}

export default CurrentLocation;
