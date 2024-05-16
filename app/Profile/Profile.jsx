'use client'
import React from 'react';
import { useCartStore } from '../Store/CartStore';
import Link from 'next/link';
import { getAuth, signOut } from "firebase/auth";
import { app } from '../Auth/firebase';
import { useEffect, useState } from 'react';

function Profile() {
    const [userInfo, setUserInfo, setCartItems] = useCartStore(state => [state.userData, state.setUserData, state.setCartItems]);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [status, setStatus] = useState(null)
    const [message, setMessage] = useState(null)
    const [progressWidth, setProgressWidth] = useState('100%'); // State to control the width of the progress bar

    const auth = getAuth(app);

    const signOutHandler = () => {
        signOut(auth).then(() => {
            setUserInfo(null);
            setCartItems([]);
            setStatus('success')
            setMessage('User Signed Out Successfully.')
            setShowSuccessAlert(true);
        }).catch((error) => {
            if (error) {
                setStatus('error')
                setMessage('An error occured, please try again later.')
            }
        });
    }

    useEffect(() => {
        if (showSuccessAlert) {
            const timer = setTimeout(() => {
                setShowSuccessAlert(false);
            }, 5000);

            // Update progress bar width every 100ms until it reaches 0%
            const interval = setInterval(() => {
                setProgressWidth(prevWidth => {
                    const newWidth = parseInt(prevWidth) - .5 + '%';
                    if (newWidth === '0%') clearInterval(interval);
                    return newWidth;
                });
            }, 50);

            // Clear interval and timeout on component unmount or when alert is hidden
            return () => {
                clearInterval(interval);
                clearTimeout(timer);
            };
        }
    }, [showSuccessAlert]);

    return (
        <div>
            {userInfo ? 
                <div className='bg-black w-[350px] md:w-[600px] rounded-lg shadow-xl m-auto text-white p-4 text-center'>
                    <div className="avatar online placeholder">
                        <div className="bg-neutral text-neutral-content rounded-full w-16">
                            <span className="text-xl">{userInfo.firstName.substring(0,1) + userInfo.lastName.substring(0,1)}</span>
                        </div>
                    </div> 
                    <h3 className='my-3'>Name: {userInfo.firstName + " " + userInfo.lastName}</h3>
                    <h4>Age: {userInfo.age}</h4>
                    <h5 className='mt-3'>Email: {userInfo.email}</h5>         
                    <button onClick={signOutHandler} className='btn bg-white text-black mt-4'>Sign Out</button>
                </div> 
                : 
                <div className='bg-black w-[350px] md:w-[600px] rounded-lg shadow-xl m-auto text-white p-4 text-center'>
                    <h3>User Is Not Logged In</h3>
                    <Link href='/Login' className='btn bg-white text-black mt-4'>Click here to Login</Link>
                </div>
            }

            {/* Success alert with progress bar */}
            { showSuccessAlert &&
                <div role="alert" className={`alert alert-${status} absolute bottom-5 right-5 w-[400px] overflow-hidden text-white shadow-lg`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{message}</span>
                    <div className="progress bg-white absolute bottom-0" style={{width: progressWidth}} ></div>
                </div>
            }
        </div>
    );
}
export default Profile;
//showSuccessAlert && 