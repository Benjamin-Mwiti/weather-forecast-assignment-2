import React, { useState, useEffect } from 'react';
import './CurrentLocation.css';
import $ from 'jquery';

function CurrentLocation() {
    
    const [latLon, setLatLon] = useState([]);
    
    console.log(latLon[0]);
    console.log(latLon);

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

        $('p').eq(1).text(`${days[day]} ${date} ${months[month]} ${year}`);
    });

    return (
        <div className="current__location">
            <p>Toronto, CA</p>
            <p></p>
            <p>-15<sup>o</sup>C</p>
            <p>Cloudy</p>
            <p>-13<sup>o</sup>C / -16<sup>o</sup>C</p>
        </div>
    )
}

export default CurrentLocation;
