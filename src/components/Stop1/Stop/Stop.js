import React, { useState } from 'react'
import '../Stop1.css';
import station from '../../../assets/images/station.svg';
import loading from '../../../assets/images/loading.svg';
const Stop = ({ flagship }) => {
    const [recommendedTime, setRecommendedTime] = useState(flagship.recommended_time);
    return (
        <div className="stop-plan1__scheduledstops">
            <div className="stop-plan1__stations">
                <h3>{flagship?.destination_name}</h3>
                <span>
                    <input
                        type="text"
                        value={recommendedTime}
                        onChange={(event) => setRecommendedTime(event?.target?.value)}
                    /> minuter
                </span>
            </div>
            <div className="stop-plan1__stations">
                <span>
                    <img src={station} alt="station" />
                </span>
                <div>
                    <span className="stop-plan1__loadamount-text">Beräknad laddmängd</span>
                    <span className="stop-plan1__progress-bar__wrapper">
                        <progress value={flagship.capacity_start_percent * 0.5} max="100" className="stop-plan1__progress-bar"></progress>
                        <img src={loading} alt="loadingbar" />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Stop;
