'use client'
import React, { useRef, useState } from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { app } from '../Auth/firebase';
import { useCartStore } from '../Store/CartStore';

function SignUp() {
    const auth = getAuth(app);
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState(null)
    const [setUserInfo] = useCartStore(state => [state.setUserData])
    const writeUserData = (userId, fname, lname, email, age) => {
        const db = getDatabase();
        set(ref(db, 'users/' + userId), {
            firstName: fname,
            lastName: lname,
            email: email,
            age: age
        });
        setUserInfo({
            firstName: fname, lastName: lname, email: email, age: age
        })
        setIsLoading(false);
        setMessage('User is successfully signed up and logged in')
        setTimeout(() => {
            setMessage(false)
        }, 5000)
    }
    const signUpWithEmailPassword = async (email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            
            // Signed up 
            const { user } = userCredential; 
            if (user) {
                writeUserData(user.uid, fNameRef.current.value, lNameRef.current.value, emailRef.current.value, ageRef.current.value)
            }
          
        } catch (error) {
            const { message: errorMessage } = error;
            setMessage(errorMessage)
            // ..
        }
    }
    const emailRef = useRef();
    const passwordRef = useRef();
    const fNameRef = useRef()
    const lNameRef = useRef()
    const ageRef = useRef()

    const SignUpHandler = () => {
        setIsLoading(true)
        signUpWithEmailPassword(emailRef.current.value, passwordRef.current.value)
    }
  return (
    <div className='w-[800px] m-auto my-12'>
        <h3 className='text-center font-medium text-2xl mb-4'>Welcome to Artsy</h3>
        <div className='flex items-center justify-between flex-wrap'>
            <div className='flex items-center gap-2'>
                <label className='font-medium text-xl' htmlFor="fname">First Name</label>
                <input type="text" name="fname" id="fname" ref={fNameRef} className='border outline-none focus:border-black rounded-md p-1' />
            </div>
            <div className='flex items-center gap-2'>
                <label className='font-medium text-xl' htmlFor="lname">Last Name</label>
                <input type="text" name="lname" id="lname" ref={lNameRef} className='border outline-none focus:border-black rounded-md p-1' />
            </div>
        </div>
        <div className='flex items-center justify-between flex-wrap my-5'>
            <div className='flex items-center gap-2'>
                <label className='font-medium text-xl' htmlFor="email">Email</label>
                <input type="text" name="email" id="email" ref={emailRef} className='border outline-none focus:border-black rounded-md p-1' />
            </div>
            <div className='flex items-center gap-2'>
                <label className='font-medium text-xl' htmlFor="age">Age</label>
                <input type="number" ref={ageRef} name="age" id="age" className='border outline-none focus:border-black rounded-md p-1' />
            </div>
        </div>
        <div className='flex items-center justify-between flex-wrap'>
            <div className='flex items-center gap-2'>
                <label className='font-medium text-xl' htmlFor="password">Password</label>
                <input type="password" name='password' className='border outline-none focus:border-black rounded-md p-1' />
            </div>
            <div className='flex items-center gap-2'>
                <label className='font-medium text-xl' htmlFor="cpassword">Confirm Password</label>
                <input type="password" name="cpassword" ref={passwordRef} className='border outline-none focus:border-black rounded-md p-1' />
            </div>
        </div>
        <button onClick={SignUpHandler} className='btn bg-black text-white hover:bg-[#333] mt-5 text-center block w-[300px] mx-auto'>
            {isLoading? <span className="loading loading-spinner loading-lg"></span> : 'Sign Up'}
        </button>
        {message && <div role="alert" className="alert alert-success absolute bottom-5 right-5 w-[400px] text-white bg-black shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{message}</span>
        </div>}
    </div>
  )
}

export default SignUp;