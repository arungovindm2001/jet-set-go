"use client"

import { useState, useEffect } from 'react';
import axios from "axios";

interface HotelData {
    description: string;
    image_url: string;
    rating: number;
}

const HotelList = () => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const { data } = await axios.post('/api/auth/user');
                console.log(data[0].username);
                const response = await axios.post('http://localhost:5000/recommend', { user_id: data[0].username });
                console.log(response.data.recommendations);
                setHotels(response.data.recommendations);
                setLoading(false); // Set loading to false when data is received
            } catch (error) {
                console.error(error);
            }
        };

        fetchHotels();
    }, []);

    return (
        <div>
            <h1 className='font-bold text-2xl text-center'>Hotel Recommendations</h1>
            {loading ? (
                <div className='flex flex-col h-screen justify-center items-center'>
                    <span className="loading loading-dots loading-lg"></span>
                </div>
            ) : (
                <div className='grid grid-cols-3 space-y-4 my-4'>
                    {Object.entries(hotels).map(([name, hotel]) => (
                        <div key={name}>
                            <div className="card w-96 bg-base-100 shadow-md">
                                <figure><img src={hotel.image_url} alt={hotel.name} /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">
                                        {name}
                                        <div className="badge badge-secondary">{hotel.rating}</div>
                                    </h2>
                                    <p>{hotel.description}</p>
                                    <div className="card-actions justify-end"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HotelList;
