/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-unescaped-entities */
'use client'
import { useRef, useEffect, useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';
import React from 'react';
import { app } from '../Auth/firebase';
import { getDatabase, ref, get } from 'firebase/database';
import { useCartStore } from '../Store/CartStore';
import { useRouter } from 'next/navigation';
import { updateUserData } from '../Cart/Components/CartItem';

function page() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const auth = getAuth(app)
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState(null)
    const [setUserInfo, cart, setCartItems] = useCartStore(state => [state.setUserData, state.cartItems, state.setCartItems])

    const mergeCartItems = (existingCartItems, currentCartItems) => {
    const mergedCartItems = new Map();
    // Add existing cart items to the merged cart items map
    if (existingCartItems) {
        existingCartItems.forEach(item => {
            mergedCartItems.set(item.product.id, item);
        });
    }

    // Add current cart items to the merged cart items map or update quantities
    currentCartItems.forEach(item => {
        const existingItem = mergedCartItems.get(item.product.id);
        if (existingItem) {
            // If item already exists in the merged cart items map, update quantity
            existingItem.quantity += item.quantity;
        } else {
            // If item doesn't exist, add it to the merged cart items map
            mergedCartItems.set(item.product.id, item);
        }
    });

    // Convert the map back to an array of cart items
    return Array.from(mergedCartItems.values());
}

    const handleLogin = async () => {
        setIsLoading(true)
        try {
            // Sign in the user with email and password
            const response = await signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value);  
            const fetchUserData = async (userId) => {
                try {
                    const db = getDatabase();
                    const userRef = ref(db);
                    const snapshot = await get(userRef, `users/${userId}`);
                    if (snapshot.exists()) {
                    const userData = snapshot.val();
                    setUserInfo(userData.users[userId]);
                    
                    const FetchCartData = async (userId) => {
                        try {
                            const db = getDatabase();
                            const userCartRef = ref(db, `user-cart/${userId}`);

                            // Fetch the data at the user-cart reference
                            const dataSnapshot = await get(userCartRef);
                            // Check if the data exists
                            if (dataSnapshot.exists()) {
                            // Data exists, retrieve the data
                            const userData = dataSnapshot.val();
                            const mergedCartItems = mergeCartItems(userData.cartItems, cart) 
                            await updateUserData(response.user.uid, mergedCartItems);
                            setCartItems(mergedCartItems)
                            // return userData;
                            } else {
                            // Data doesn't exist
                            }
                        } catch (error) {
                            console.error("Error fetching user data:", error);
                            return null;
                        }
                    };

                    FetchCartData(userId);
                    setIsLoading(false)
                    // return userData;
                    } else {
                    // Data not found
                    setIsLoading(false)
                    console.log("No data available for this user");
                    return null;
                    }
                } catch (error) {
                    console.log("Error reading user data:", error.message);
                    return null;
                }
            };
            fetchUserData(response.user.uid)
            router.replace('/Profile')
            // Optionally, you can redirect the user to another page or perform other actions
        } catch (error) {
            setIsLoading(false)
            console.log(error.message)
        }
    };

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
        <button onClick={handleLogin} className='btn bg-black text-white hover:bg-[#333]'>{isLoading? <span className="loading loading-spinner loading-lg"></span> : "Login"}</button>
        <h3>Don't have an account yet? <Link href='/SignUp' className='text-sm underline'>Sign Up</Link></h3>
        
        {message && <div role="alert" className="alert alert-success">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{message}</span>
        </div>}
    </div>
  )
}

export default page;

// In handleLogin function
