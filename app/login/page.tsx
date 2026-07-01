'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import{toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function loginPage() {

  const route = useRouter()
  const [user , setUser] = useState({
    email : "",
    password : ""
  })
  const[disabled , setDisabled] = useState(false)
  const[loading , setLoading] = useState(false)

  const onLogin = async () => {
    try {
      setLoading(true)
      const response = await axios.post("/api/users/login", user)
      toast.success(response.data?.message || "Login successful!")
      console.log("login successful", response.data)
      route.push("/profile")
    } catch (error: any) {
      const message = error?.response?.data?.message || error?.message || "Login failed"
      toast.error(message)
      console.log("login failed", error)
    } finally {
      setLoading(false)
    }
  }


  useEffect(()=>{
    if(user.email.length > 0 && user.password.length > 4){
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  },[user])

  return (
    <div className='relative min-h-screen flex items-center justify-center bg-white'>
      <img
        src='https://hips.hearstapps.com/hmg-prod/images/tropical-waterfall-amazon-rain-forest-royalty-free-image-1728411255.jpg?crop=0.99956xw:1xh;center,top'
        alt='background'
        className='absolute inset-0 h-full w-full object-cover opacity-60'
      />

      <div className='relative z-10 w-full max-w-md rounded-3xl border-2 border-white/60 p-9 shadow-xl bg-transparent text-black space-y-4 backdrop-blur-lg'>
        <h1 className='text-2xl font-bold text-center'>
          {loading ? "processing 🔄️" : "Login"}
        </h1>
        <br></br>

        <div className='space-y-2'>
          <label htmlFor='email' className='block font-medium'>Email</label>
          <input
            type='email'
            id='email'
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className='border border-black rounded-md p-2 w-full'
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
            className='border border-black rounded-md p-2 w-full'
            placeholder='password'
            
          />
        </div>
        <br></br>

        <button
          onClick={onLogin}
          className='w-full bg-green-400 text-black px-4 py-2 rounded-md hover:bg-green-500 disabled:opacity-50'
          // disabled={disabled || loading}
        >
          {loading ? "Processing..." : disabled ? "Fill all fields" : "Login"}
        </button>
        
          

        <div className='text-center'>
          <Link href='/signup' className='text-black hover:underline'>
            Signup if you don't have an account?
          </Link>
        </div>
      </div>
    </div>
  )
}


