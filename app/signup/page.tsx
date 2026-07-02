'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import{toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function signupPage() {

  const route = useRouter()
  const [user , setUser] = useState({
    username : "",
    email : "",
    password : ""
  })
  const[disabled , setDisabled] = useState(false)
  const[loading , setLoading] = useState(false)

  const onSingup = async () => {
    try {
      setLoading(true)
      const response = await axios.post("/api/users/signup", user)
      toast.success(response.data?.message || "Signup successful!")
      console.log("signup successful", response.data)
      route.push("/login")
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message || "Signup failed"
      toast.error(message)
      console.log("signup failed", error)
    } finally {
      setLoading(false)
    }
  }


  useEffect(()=>{
    if(user.username.length > 0 && user.email.length > 0 && user.password.length > 4){
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  },[user])

  return (
    <div className='relative min-h-screen flex items-center justify-center bg-white'>
      <img
        src='https://i.ytimg.com/vi/ACiD5RDxyhw/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDVjjvzu5M-27Ew2tjh9u0fXYmviA'
        className='absolute inset-0 h-full w-full object-cover opacity-80'
      />

      <div className='relative z-10 w-full max-w-md rounded-3xl border-2 border-white/60 p-9 shadow-xl bg-transparent text-black space-y-4 backdrop-blur-lg'>
        <h1 className='text-2xl font-bold text-center'>
          {loading ? "processing 🔄️" : "Signup"}
        </h1>
        <br></br>

        <div className='space-y-2'>
          <label htmlFor='username' className='block font-medium'>Username</label>
          <input
            type='text'
            id='username'
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            className='border border-gray-300 rounded-md p-2 w-full'
            placeholder='username'
            
          />
        </div>

        <div className='space-y-2'>
          <label htmlFor='email' className='block font-medium'>Email</label>
          <input
            type='email'
            id='email'
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className='border border-gray-300 rounded-md p-2 w-full'
            placeholder='email'
            
          />
        </div>

        <div className='space-y-2'>
          <label htmlFor='password' className='block font-medium'>Password</label>
          <input
            type='password'
            id='password'
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className='border border-gray-300 rounded-md p-2 w-full'
            placeholder='password'
            
          />
        </div>
        <br></br>

        <button
          onClick={onSingup}
          className='w-full bg-blue-300 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50'
          // disabled={disabled || loading}
        >
          {loading ? "Processing..." : disabled ? "Fill all fields" : "Signup"}
        </button>
        
          

        <div className='text-center'>
          <Link href='/login' className='text-blue-500 hover:underline'>
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  )
}


