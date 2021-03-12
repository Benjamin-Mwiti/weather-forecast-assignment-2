import React, { useState, useEffect } from 'react';
import { useStateValue } from './StatsProvider';
import { CaretDownFill } from 'react-bootstrap-icons';

function VisitedCities() {

    const [{ stats }] = useStateValue();
    const [visitedCitiesCount, setvisitedCitiesCount] = useState(0);
    const recently_Viewed = [];
    console.log(stats);

    recently_Viewed.map(viewedID => {
        if(stats.id !== viewedID) {
            recently_Viewed.push(stats.id);
            console.log(recently_Viewed);
        } else {
            console.log("Failed");
        }
    });

    return (
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
    )
}

export default VisitedCities;
