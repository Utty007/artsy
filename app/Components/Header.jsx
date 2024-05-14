'use client'
import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import EmptyCart from '../Assets/Icons/EmptyCart';
import CartIcon from "../Assets/Icons/CartIcon";
import SearchIcon from "../Assets/Icons/SearchIcon";
import ProfileIcon from '@/app/Assets/Icons/profileIcon.png';
import { useCartStore } from '../Store/CartStore';
import { getAuth } from 'firebase/auth';
import { app } from '../Auth/firebase';
import { getDatabase, ref, get } from 'firebase/database';
// import { FetchCartData } from '../Auth/firebaseService';

function Header() {
  const [cartItems, userId, setUserId, setUserInfo, setCartItems] = useCartStore(state => [state.cartItems, state.userId, state.setUserId, state.setUserData, state.setCartItems]);
  
  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // If user is logged in, fetch user data
        setUserId(user.uid);
        const FetchCartData = async (userId) => {
          // const [setCartItems] = useCartStore((state) => [state.setCartItems]);
          try {
            const db = getDatabase();
            const userCartRef = ref(db, `user-cart/${userId}`);

            // Fetch the data at the user-cart reference
            const dataSnapshot = await get(userCartRef);
            // Check if the data exists
            if (dataSnapshot.exists()) {
              // Data exists, retrieve the data
              const userData = dataSnapshot.val();
              setCartItems(userData.cartItems);
              // return userData;
            } else {
              // Data doesn't exist
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
            return null;
          }
        };

        FetchCartData(user.uid);
      } else {
        // If user is not logged in, clear user data
        setUserId(null);
      }
    });

    return () => unsubscribe(); // Cleanup function for the authentication listener
  }, []);

  useEffect(() => {
    const fetchUserData = async (userId) => {
      try {
        const db = getDatabase();
        const userRef = ref(db, `users/${userId}`);
        const snapshot = await get(userRef);        
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setUserInfo(userData);
        } else {
          //That is not data is available for this user
        }
      } catch (error) {
        console.log("Error reading user data:", error.message);
      }
    };

    if (userId !== null) {
      fetchUserData(userId);
    }
  }, [userId]);

  return (
    <header className="flex items-center justify-between px-6 py-3">
      <div className='lg:hidden'>
        <label className="btn btn-circle bg-transparent border-0 shadow-none swap swap-rotate">
          {/* this hidden checkbox controls the state */}
          <input type="checkbox" />
          {/* hamburger icon */}
          <svg className="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"/></svg>
          {/* close icon */}
          <svg className="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"/></svg>
        </label>
      </div>
      <h1 className="text-xl font-bold">ARTSY.</h1>
      <nav className="hidden lg:flex items-center gap-5">
        <Link href="/" className="transition-all active:text-zinc-950 active:font-bold hover:underline text-zinc-600">Home</Link>
        <Link href="/Marketplace" className="transition-all active:text-zinc-950 active:font-bold hover:underline text-zinc-600">Marketplace</Link>
        <Link href="/Auctions" className="transition-all active:text-zinc-950 active:font-bold hover:underline text-zinc-600">Auctions</Link>
        <Link href="/Drops" className="transition-all active:text-zinc-950 active:font-bold hover:underline text-zinc-600">Drops</Link>
      </nav>
      <div className="flex items-center">
        <SearchIcon />
        <Link href='/Cart'>
          {cartItems.length === 0 ? <EmptyCart /> : <CartIcon />}
        </Link>
        <Link href='/Profile' className='hidden lg:block'>
          <Image src={ProfileIcon} width={39} height={39} className='cursor-pointer p-1' alt='Profile icon' />
        </Link>
      </div>
    </header>
  );
}

export default Header;