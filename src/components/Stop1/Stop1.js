import React, { useState } from 'react'
import './Stop1.css';
import Stop from './Stop/Stop';

const Stop1 = ({ startpoint, destinationPoint, isFlagship, stops }) => {

    const flagships = stops.filter(stop => stop.recommended_time);

    const [showFullDescription, setShowFullDescription] = useState(false);

    const toggleShowFullDescription = () => {
        setShowFullDescription(!showFullDescription);
    }
    return (
        <div className="stop-plan1__wrapper">
            <div className="stop-plan1__icon">
                <a href="/">
                    <svg xmlns="http://www.w3.org/2000/svg" height="34" viewBox="0 96 960 960" width="48">
                        <path fill="currentColor" d="m480 722 42-42-74-74h182v-60H448l74-74-42-42-146 146 146 146Zm0 254q-82 0-155-31.5t-127.5-86Q143 804 111.5 731T80 576q0-83 31.5-156t86-127Q252 239 325 207.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 82-31.5 155T763 858.5q-54 54.5-127 86T480 976Zm0-60q142 0 241-99.5T820 576q0-142-99-241t-241-99q-141 0-240.5 99T140 576q0 141 99.5 240.5T480 916Zm0-340Z" />
                    </svg>
                </a>
            </div>
            <div className="stop-plan1__text">
                <span>
                    Din resa
                </span>
            </div>
            <table className="stop-plan1__stops">
                <tr>
                    <td>Startpunkt</td>
                    <td className="stop-plan1__startpoint">{startpoint}</td>
                </tr>
                <tr>
                    <td>Destination</td>
                    <td className="stop-plan1__destinationpoint">{destinationPoint}</td>
                </tr>
            </table>
            <span className="stop-plan1__description">Inplanerade stopp</span>
            {flagships.map(flagship => (
                <Stop key={flagship.id} flagship={flagship} />
            ))}
            <p className="stop-plan1__underline"></p>
            <div className="stop-plan1__heading">
                <h4>På vägen</h4>
            </div>
            <ul>
                {isFlagship &&
                    isFlagship.map((flagship, index) => {
                        return (
                            <>
                                <li key={index}>
                                    <span>{flagship.stations.name}</span>
                                </li>
                            </>
                        )
                    })
                }
            </ul>
            {isFlagship && (
                <div>
                    <h4 className="stop-plan1__flagship-name">{isFlagship[0].stations.experience.name}</h4>
                    <p className="stop-plan1__flagship-text">{showFullDescription ? isFlagship[0].stations.experience.description : `${isFlagship[0].stations.experience.description.substring(0, 100)}...`}</p>
                </div>
            )}
            <button onClick={toggleShowFullDescription}>
                {showFullDescription ? "Visa mindre" : "Läs mer"}
            </button>
            <button>
                Gå vidare
            </button>
        </div>
    )
}
export default Stop1;
