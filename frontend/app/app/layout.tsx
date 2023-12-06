"use client"

import "./globals.css";
import { Navbar } from "@/components/Navbar";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

async function getUser() {
  try {
    const { data } = await axios.get('/api/auth/check')
    console.log(data)
    return data
  } catch (e) {
    const error = e as AxiosError
    return error
  }
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSuccess, setIsSuccess] = useState<Boolean>(false)
  const [username, setUsername] = useState(' ')
  const router = useRouter()
  useEffect(() => {
    (async () => {
      const { username, authenticated } = await getUser()
      setUsername(username)
      if (!authenticated) {
        router.push("/")
        return;
      }
      setIsSuccess(true)
    })()
  }, [router])

  return (
    isSuccess ? (
      <body>
        <Navbar username={username} />
        {children}
      </body>
    ) : (
      <div className='flex flex-col h-screen justify-center items-center'>
        <span className="loading loading-dots loading-lg"></span>
      </div>
    )

  )

}
