'use client'
import React, { useRef, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { app } from '../Auth/firebase';
import { useCartStore } from '../Store/CartStore';
import { useRouter } from 'next/navigation';

function SignUp() {
    const auth = getAuth(app);
    const [isLoading, setIsLoading] = useState(false);
    const [generalMessage, setGeneralMessage] = useState(null);
    const [emailWarning, setEmailWarning] = useState(null);
    const [passwordWarning, setPasswordWarning] = useState(null);
    const [setUserInfo] = useCartStore(state => [state.setUserData]);
    const router = useRouter()

    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const fNameRef = useRef();
    const lNameRef = useRef();
    const ageRef = useRef();

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
        });
        setIsLoading(false);
        setGeneralMessage('User is successfully signed up and logged in, redirecting...');
        setTimeout(() => {
            setGeneralMessage(null);
            router.replace('/Profile')
        }, 3000);
    }

    const signUpWithEmailPassword = async (email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const { user } = userCredential;
            if (user) {
                writeUserData(user.uid, fNameRef.current.value, lNameRef.current.value, email, ageRef.current.value);
            }
        } catch (error) {
            const { message: errorMessage } = error;
            setGeneralMessage(errorMessage);
        }
    }

    const validateForm = () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;
        const fName = fNameRef.current.value;
        const lName = lNameRef.current.value;
        const age = ageRef.current.value;

        let valid = true;

        if (!fName || !lName || !email || !age || !password || !confirmPassword) {
            setGeneralMessage('All fields are required');
            valid = false;
        } else {
            setGeneralMessage(null);
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setEmailWarning('Invalid email format');
            valid = false;
        } else {
            setEmailWarning(null);
        }

        if (password !== confirmPassword) {
            setPasswordWarning('Passwords do not match');
            valid = false;
        } else {
            setPasswordWarning(null);
        }

        return valid;
    }

    const SignUpHandler = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setIsLoading(true);
            signUpWithEmailPassword(emailRef.current.value, passwordRef.current.value);
        }
    }

    return (
        <div className='md:w-[800px] md:m-auto my-12'>
            <h3 className='ml-6 md:ml-0 text-center font-medium text-2xl mb-4'>Welcome to Artsy</h3>
            <form className='flex flex-col gap-4 px-8' onSubmit={SignUpHandler} autoComplete='off'>
                <div className='flex flex-col md:flex-row items-left md:items-center justify-between gap-4 flex-row-wrap'>
                    <div className='flex md:flex-row md:items-center gap-2 justify-between md:justify-normal flex-col items-start'>
                        <label className='font-medium text-xl' htmlFor="fname">First Name</label>
                        <input type="text" name="fname" id="fname" ref={fNameRef} className='border outline-none focus:border-black rounded-md p-1' />
                    </div>
                    <div className='flex md:flex-row md:items-center gap-2 justify-between md:justify-normal flex-col items-start'>
                        <label className='font-medium text-xl' htmlFor="lname">Last Name</label>
                        <input type="text" name="lname" id="lname" ref={lNameRef} className='border outline-none focus:border-black rounded-md p-1' />
                    </div>
                </div>
                <div className='flex flex-col md:flex-row items-left md:items-center justify-between flex-wrap gap-4 md:my-5'>
                    <div className='flex md:items-center gap-2 justify-between md:justify-normal flex-col items-start md:flex-row'>
                        <label className='font-medium text-xl' htmlFor="email">Email</label>
                        <div>
                            <input type="text" autoComplete='off' name="email" id="email" ref={emailRef} className='border outline-none focus:border-black rounded-md p-1' />
                            {emailWarning && <span className="text-red-500">{emailWarning}</span>}
                        </div>
                    </div>
                    <div className='flex md:flex-row md:items-center gap-2 justify-between md:justify-normal flex-col items-start'>
                        <label className='font-medium text-xl' htmlFor="age">Age</label>
                        <input type="number" ref={ageRef} name="age" id="age" className='border outline-none focus:border-black rounded-md p-1' />
                    </div>
                </div>
                <div className='flex flex-col md:flex-row items-left md:items-center gap-4 justify-between flex-wrap'>
                    <div className='flex md:flex-row md:items-center gap-2 justify-between md:justify-normal flex-col items-start'>
                        <label className='font-medium text-xl' htmlFor="password">Password</label>
                        <input type="password" autoComplete='off' name='password' ref={passwordRef} className='border outline-none focus:border-black rounded-md p-1' />
                    </div>
                    <div className='flex md:flex-row md:items-center gap-2 justify-between md:justify-normal flex-col items-start'>
                        <label className='font-medium text-xl' htmlFor="cpassword">Confirm Password</label>
                        <div>
                            <input type="password" name="cpassword" ref={confirmPasswordRef} className='border outline-none focus:border-black rounded-md p-1' />
                            {passwordWarning && <span className="text-red-500">{passwordWarning}</span>}
                        </div>
                    </div>
                </div>
                <button type="submit" className='btn bg-black text-white hover:bg-[#333] mt-5 text-center block w-[300px] mx-auto'>
                    {isLoading ? <span className="loading loading-spinner loading-lg"></span> : 'Sign Up'}
                </button>
                {generalMessage && <div role="alert" className="alert alert-success absolute bottom-5 right-5 w-[400px] text-white shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{generalMessage}</span>
                </div>}
            </form>
        </div>
    )
}

export default SignUp;