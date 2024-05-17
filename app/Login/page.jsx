/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unescaped-entities */
'use client'
import React, { useRef, useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';
import { useRouter } from 'next/navigation';
import { useCartStore } from '../Store/CartStore';
import { app } from '../Auth/firebase';

function Page() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const auth = getAuth(app);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [setUserInfo, cart, setCartItems] = useCartStore(state => [state.setUserData, state.cartItems, state.setCartItems]);

    const mergeCartItems = (existingCartItems, currentCartItems) => {
        const mergedCartItems = new Map();
        if (existingCartItems) {
            existingCartItems.forEach(item => {
                mergedCartItems.set(item.product.id, item);
            });
        }
        currentCartItems.forEach(item => {
            const existingItem = mergedCartItems.get(item.product.id);
            if (existingItem) {
                existingItem.quantity += item.quantity;
            } else {
                mergedCartItems.set(item.product.id, item);
            }
        });
        return Array.from(mergedCartItems.values());
    }

    const handleLogin = async () => {
        setIsLoading(true);
        setMessage(null);
        try {
            const response = await signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value);
            const fetchUserData = async (userId) => {
                try {
                    const db = getDatabase();
                    const userRef = ref(db, `users/${userId}`);
                    const snapshot = await get(userRef);
                    if (snapshot.exists()) {
                        const userData = snapshot.val();
                        setUserInfo(userData);
                        const fetchCartData = async (userId) => {
                            try {
                                const userCartRef = ref(db, `user-cart/${userId}`);
                                const dataSnapshot = await get(userCartRef);
                                if (dataSnapshot.exists()) {
                                    const userData = dataSnapshot.val();
                                    const mergedCartItems = mergeCartItems(userData.cartItems, cart);
                                    setCartItems(mergedCartItems);
                                }
                            } catch (error) {
                                console.error('Error fetching user cart data:', error);
                            }
                        };
                        await fetchCartData(userId);
                        setIsLoading(false);
                    } else {
                        setIsLoading(false);
                        console.log('No data available for this user');
                    }
                } catch (error) {
                    console.error('Error reading user data:', error.message);
                }
            };
            await fetchUserData(response.user.uid);
            router.replace('/Profile');
        } catch (error) {
            setIsLoading(false);
            if (error.message === 'Firebase: Error (auth/invalid-credential).') {
                setShowErrorAlert(true)
                setMessage('Check Email/Password And Try Again')
                setTimeout(() => {
                    setMessage(null)
                    setShowErrorAlert(false)
                }, 5000)
            } else {
                console.log(error)
                setShowErrorAlert(true) 
                setMessage('An Error Occured Please Try Again Later')
                setTimeout(() => {
                    setMessage(null)
                    setShowErrorAlert(false)
                }, 5000)
            }
        }
    };

    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [progressWidth, setProgressWidth] = useState('100%');

    useEffect(() => {
        if (showErrorAlert) {
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
            };
        }
    });

    return (
        <div className='my-12 mx-auto w-[500px] flex flex-col gap-4'>
            <h2>Welcome to Artsy</h2>
            <div className='flex gap-2 items-center'>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" ref={emailRef} className='p-2 outline-none border rounded-md w-full focus:border-black' placeholder='johndoe@gmail.com' />
            </div>
            <div className='flex gap-2 items-center'>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" ref={passwordRef} className='p-2 outline-none border rounded-md w-full focus:border-black' placeholder='JohnDoe!007' />
            </div>
            <button onClick={handleLogin} className='btn bg-black text-white hover:bg-[#333]'>
                {isLoading ? <span className="loading loading-spinner loading-lg"></span> : "Login"}
            </button>
            <h3>Don't have an account yet? <a href='/SignUp' className='text-sm underline'>Sign Up</a></h3>
            
            {showErrorAlert && <div role="alert" className="alert alert-error overflow-hidden absolute bottom-5 right-5 w-[400px] text-white shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{message}</span>
                <div className="progress bg-white absolute bottom-0" style={{width: progressWidth}} ></div>
            </div>}
        </div>
    );
}

export default Page;
