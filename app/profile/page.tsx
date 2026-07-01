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
      const userId = response.data?.user?._id

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
    <div className='flex flex-col items-center justify-center h-screen relative '>
      <img src="https://assets.architecturaldigest.in/photos/60083af8f93542952b6654c6/16:9/w_2560%2Cc_limit/home-decor-Duplex-apartment-home-design-pexels-vecislavas-popa-1571460-1366x768.jpg" alt="Profile" 
      className=' absolute w-full h-full object-cover rounded-lg shadow-lg opacity-10'/>
      <div className=' relative bg-transparent p-8 rounded shadow-md w-96'>
      <h1 className='text-2xl font-bold'>profile page</h1>
      <br />
      <h2>
        {data ? <Link href={`/profile/${data}`}>View {data}</Link> : 'No data available'}
      </h2>
      <br/>
      <button onClick={logout}
      className='bg-red-500 text-white px-4 py-2 rounded mt-4 hover:bg-red-600 transition duration-300'
      >logout</button>
      </div>
    </div>
  )
}
