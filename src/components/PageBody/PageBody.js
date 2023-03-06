import React, { useState } from 'react'
import BookingPage from '../BookingPage/BookingPage';
import PageHeader from '../PageHeader/PageHeader';
import './PageBody.css';

export const PageBody = () => {
    const [destinationPoint, setDestinationPoint] = useState("");
    const [startpoint, setStartpoint] = useState("");
    const [destinations, setDestinations] = useState([]);
    const [showDestinations, setShowDestinations] = useState(false);
    const handleStartpointChange = (event) => {
        setStartpoint(event.target.value);
    };

    const handleDestinationPointChange = (event) => {
        setDestinationPoint(event.target.value);
    };
    const handleGetDestinations = async (event) => {
        event.preventDefault();
        const response = await fetch(`https://tempers.info/api/get_destinations/${startpoint}/${destinationPoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.status === 200) {
            const data = await response.json();
            console.log("data: ", data);
            setDestinations(data);
            setShowDestinations(true);
        }
        else { return (`Error fetching destinations. Status code: ${response.status}`) }
    }

    return (
        <main>
            {
                showDestinations ? <BookingPage destinations={destinations} startpoint={startpoint} destinationPoint={destinationPoint} />
                    :
                    <>
                        <PageHeader />
                        <div className="page-body__wrapper">
                            <div className="page-body__placeholder">
                                <span>Placeholder för loyaltyprogram</span>
                            </div>
                            <div className="page-body__information">
                                <div className="page-body__information__text">
                                    <span>Vart vill du resa?</span>
                                </div>
                                <div className="page-body__information">
                                    <form onSubmit={handleGetDestinations}>
                                        <input
                                            type="text"
                                            value={startpoint}
                                            onChange={handleStartpointChange}
                                            placeholder={startpoint ? "" : "Ange startpunkt"}
                                            className="page-body__information--startpoint"

                                        />
                                        <input
                                            type="text"
                                            value={destinationPoint}
                                            onChange={handleDestinationPointChange}
                                            placeholder={destinationPoint ? "" : "Ange destination"}
                                            className="page-body__information--destinationpoint"
                                        />
                                        <button type="submit" onClick={handleGetDestinations}>
                                            Planera resa
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </>
            }
        </main>
    )
}
