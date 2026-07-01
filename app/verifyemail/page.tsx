'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Link from 'next/link';

export default  function verifyemail() {
    const[token , setToken] = useState("") ;
    const [error, setError] = useState("") ;
    const[verified , setVerified] = useState(false) ;

    const verifyEmail = async () =>{
        try {
            await axios.post("/api/users/verifyemail" , { token }) ;
            setVerified(true) ;
        } catch (error : any) {
            setError(error.message) ;
            console.error("Verification failed", error);
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    },[])

    useEffect(() => {
        if(token){
            verifyEmail() ;
        }
    },[token])

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-2xl font-bold mb-4'>Email Verification</h1>
      <h2 className = "*:text-lg mb-4">
        {token ? `Verification token: ${token}` : "No token found"} </h2>
        {verified && (
            <div>
                <p className='text-green-500'>Email verified successfully!</p>
                <Link href="/login" className='text-blue-500 underline'>Go to Login</Link>
            </div>
        )}
        {error && (
            <div>
                <p className='text-red-500'>Error verifying email.</p>
            </div>
        )}
    </div>
  )
}


