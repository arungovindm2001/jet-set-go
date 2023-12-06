"use client"

import axios, { AxiosError } from 'axios'
import React, { useEffect, useState } from 'react'
import { UserData } from '@/types/types'

const Profile = () => {
    const [recommendations, setRecommendations] = useState()
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const { data } = await axios.post("/api/auth/user")
                setRecommendations(data[0].hotel_ratings)
                console.log(data[0].hotel_ratings)
            } catch (e) {
                const error = e as AxiosError
                alert(error.message)
            }
        }
        fetchUserData()
    }, [])
    return (
        <div>
            <h1 className='font-bold text-2xl text-center'>My Recommendations</h1>

            {recommendations ? (
                <div className="grid grid-cols-3 space-y-4 my-4">
                    {Object.entries(recommendations).map(([hotel, rating]) => (
                        <div key={hotel} className="card w-96 bg-base-100 shadow-md">
                            <div className="card-body">
                                <h2 className="card-title">{hotel}</h2>
                                <div className="card-actions justify-end">
                                    <div className="badge badge-secondary">{rating}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className='flex flex-col h-screen justify-center items-center'>
                    <span className="loading loading-dots loading-lg"></span>
                </div>
            )}
        </div>
    )
}

export default Profile