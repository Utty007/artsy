/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React, { useRef, useState } from 'react'

function page() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState();
    const [showErrorAlert, setShowErrorAlert] = useState();

    const handleLogin = () => {
        return null;
    }

  return (
    <div className='my-12 mx-6 md:mx-auto md:w-[500px] flex flex-col gap-4 overflow-x-hidden'>
            <h2 className='text-2xl text-center font-medium mb-4'>Dear Merchant, Welcome to Artsy</h2>
            <div className='flex gap-2 items-center'>
                <label className='w-[150px]' htmlFor="email">Merchant Email</label>
                <input type="email" name="email" ref={emailRef} className='p-2 outline-none border rounded-md w-full focus:border-black' placeholder='johndoe@gmail.com' />
            </div>
            <div className='flex gap-2 items-center'>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" ref={passwordRef} className='p-2 outline-none border rounded-md w-full focus:border-black' placeholder='JohnDoe!007' />
            </div>
            <button onClick={handleLogin} className='btn bg-black text-white hover:bg-[#333]'>
                {isLoading ? <span className="loading loading-spinner loading-lg"></span> : "Login"}
            </button>
            <h3>Don't have a merchant account yet? <a href='/MerchSignup' className='text-sm underline'>Sign Up</a></h3>
            
            {showErrorAlert && <div role="alert" className="alert alert-error overflow-hidden absolute bottom-5 right-5 w-[400px] text-white shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{message}</span>
                <div className="progress bg-white absolute bottom-0" style={{width: progressWidth}} ></div>
            </div>}
        </div>
  )
}

export default page