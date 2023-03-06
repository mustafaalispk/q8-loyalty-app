import React, { useState } from 'react';
import './BookingPage.css';
import calender from '../../assets/images/calendar.svg';
import Stop1 from '../Stop1/Stop1';

const BookingPage = ({ destinations, startpoint, destinationPoint }) => {
    const [selectedDestination, setSelectedDestination] = useState("");
    const [stops, setStops] = useState([]);
    const [showStop1, setShowStop1] = useState(false);

    const isFlagship = destinations.filter(destination => destination?.stations?.experience?.is_flagship === "1");

    // Display all the slected options
    const handleSelectDestination = (event) => {
        const selectedOption = event.target.value;
        if (!selectedDestination.includes(selectedOption)) {
            setSelectedDestination([...selectedDestination, selectedOption]);
        }
    }
    // Delete the selected option from the list
    const handleDeleteDestination = (index) => {
        // Here we are creating new array and  copy all the elements of the selectedDestination array.
        const updatedDestinations = [...selectedDestination];
        updatedDestinations.splice(index, 1);
        setSelectedDestination(updatedDestinations);
    }
    const handleNextButtonClick = async (event) => {
        const response = await fetch(`https://tempers.info/api/calculate_stops`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                stops: [
                    {
                        "name": "Halmstad",
                        "rest_time": 0
                    },
                    {
                        "name": "Ljungby",
                        "rest_time": 0
                    },
                    {
                        "name": "Linköping",
                        "rest_time": 0
                    },
                    {
                        "name": "Stockholm",
                        "rest_time": 0
                    }
                ]
            })
        });
        if (response.status === 200) {
            const data = await response.json();
            console.log("data: ", data);
            setStops(data);
            setShowStop1(true);
        }
        else { return (`Error fetching destinations. Status code: ${response.status}`) }
    }
    return (
        /*Display the destinations in select tag */
        <>
            {
                showStop1 ? <Stop1 startpoint={startpoint} destinationPoint={destinationPoint} stops={stops} isFlagship={isFlagship} /> :
                    <div className="page-booking__wrapper">
                        <div className="page-booking__icon">
                            <a href="/">
                                <svg xmlns="http://www.w3.org/2000/svg" height="34" viewBox="0 96 960 960" width="48">
                                    <path fill="currentColor" d="m480 722 42-42-74-74h182v-60H448l74-74-42-42-146 146 146 146Zm0 254q-82 0-155-31.5t-127.5-86Q143 804 111.5 731T80 576q0-83 31.5-156t86-127Q252 239 325 207.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 82-31.5 155T763 858.5q-54 54.5-127 86T480 976Zm0-60q142 0 241-99.5T820 576q0-142-99-241t-241-99q-141 0-240.5 99T140 576q0 141 99.5 240.5T480 916Zm0-340Z" />
                                </svg>
                            </a>
                        </div>
                        <div className="page-booking__text">
                            <span>
                                Vilket datum vill du åka?
                            </span>
                        </div>
                        <div className="page-booking__image">
                            <img src={calender} alt="calender" />
                        </div>
                        <p className="page-booking__underline"></p>
                        <div className="page-booking__sations">
                            <select onChange={handleSelectDestination}>
                                {destinations.map((destination, index) => (
                                    <option key={index} value={destination.stations.name}>
                                        {destination.stations.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {
                            selectedDestination.length > 0 && (
                                <React.Fragment>
                                    <div className="page-booking__heading">
                                        <h4>Valda stopp</h4>
                                    </div>
                                    <ul className="page-booking__selectedstops">
                                        {selectedDestination.map((destination, index) => {
                                            return (
                                                <li key={index}>
                                                    <span>{destination}</span>
                                                    <button className="page-booking__delete" onClick={() => handleDeleteDestination(index)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="20" width="20">
                                                            <path fill="currentColor" d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
                                                        </svg>

                                                    </button>
                                                </li>
                                            )
                                        })
                                        }
                                    </ul>
                                    <p className="page-booking__underline" />
                                    <div className="page-booking__heading">
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
                                            <h4 className="page-booking__flagship-name">{isFlagship[0].stations.experience.name}</h4>
                                            <p className="page-booking__flagship-text">{isFlagship[0].stations.experience.description}</p>
                                        </div>

                                    )}
                                    <button className="page-booking__next-button" onClick={handleNextButtonClick}>
                                        Gå vidare
                                    </button>

                                </React.Fragment>
                            )
                        }
                    </div>
            }
        </>
    )
}
export default BookingPage;
