"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const router = useRouter()
  const [data, setData] = useState<string | null>(null)

  const getUserData = async () => {
    try {
      const response = await axios.post('/api/users/me')
      const userId = response.data?.user?.username || null

      if (!userId) {
        throw new Error('User data not found')
      }

      setData(userId)
    } catch (error: any) {
      const message = error.response?.data?.message || error.message
      toast.error(message)
      console.error(message)
    }
  }

  const logout = async () => {
    try {
      await axios.get('/api/users/logout')
      toast.success('Logged out successfully')
      router.push('/login')
    } catch (error: any) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    getUserData()
  }, [])

  

  return (
    <div className='relative min-h-screen flex items-center justify-center bg-white'>
      <img
        src='https://assets.architecturaldigest.in/photos/60083af8f93542952b6654c6/16:9/w_2560%2Cc_limit/home-decor-Duplex-apartment-home-design-pexels-vecislavas-popa-1571460-1366x768.jpg'
        alt='background'
        className='absolute inset-0 h-full w-full object-cover opacity-60'
      />

      <div className='relative z-10 w-full max-w-md rounded-3xl border-2 border-white/60 bg-white/30 p-9 shadow-xl backdrop-blur-lg text-black space-y-6'>
        <h1 className='text-2xl font-bold text-center'>Profile</h1>
        <br/><br/>
        <div className='space-y-3 rounded-xl  bg-white/20 px-4 py-5 text-center'>
          {data ? (
            <Link href={`/profile/${data}`}>
              <h2 className='text-xl font-semibold text-black transition hover:text-red-500'>User Name    : {data}</h2>
            </Link>
          ) : (
            <p className='text-base text-black/70'>No data available</p>
          )}
        </div>
          <br/><br/>
        <button
          onClick={logout}
          className='w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 disabled:opacity-50'
        >
          Logout
        </button>
      </div>
    </div>
  )
}
