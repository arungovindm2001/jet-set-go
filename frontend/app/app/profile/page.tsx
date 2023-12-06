"use client"

import axios, { AxiosError } from 'axios'
import React, { useEffect, useState } from 'react'
import { DisplayData } from './components/DisplayData'
import { UserData } from '@/types/types'

const Profile = () => {
  const [userData, setUserData] = useState<UserData>()
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.post("/api/auth/user")
        setUserData(data[0])
        console.log(data[0])
      } catch (e) {
        const error = e as AxiosError
        alert(error.message)
      }
    }
    fetchUserData()
  }, [])
  return (
    <div>
      <h1 className='font-bold text-2xl text-center'>Profile</h1>
      {userData ? (
        <DisplayData userData={userData} />
      ) : (
        <div className='flex flex-col h-screen justify-center items-center'>
          <span className="loading loading-dots loading-lg"></span>
        </div>
      )}
    </div>
  )
}

export default Profile