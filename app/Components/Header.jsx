'use client';
import { useEffect, useState } from 'react';
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

function Header() {
  const [cartItems, userId, setUserId, setUserInfo, setCartItems, setCartIsLoading] = useCartStore(state => [state.cartItems, state.userId, state.setUserId, state.setUserData, state.setCartItems, state.setCartIsLoading]);
  const [loggedInStatus, setStatus] = useState(false);
  const [mNavDisplay, setMNavDisplay] = useState(false);

  const handleDisplayNav = () => {
    setMNavDisplay(true);
  };

  const handleOffNav = () => {
    setMNavDisplay(false);
  };

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setStatus(true);
        setUserId(user.uid);

        const fetchUserData = async (userId) => {
          try {
            const db = getDatabase();
            const clientRef = ref(db, `users/client/${userId}`);
            const merchantRef = ref(db, `users/merchant/${userId}`);

            const clientSnapshot = await get(clientRef);
            const merchantSnapshot = await get(merchantRef);

            if (clientSnapshot.exists()) {
              const userData = clientSnapshot.val();
              setUserInfo(userData);
            } else if (merchantSnapshot.exists()) {
              const userData = merchantSnapshot.val();
              setUserInfo(userData);
            } else {
              console.log("No data available for this user");
            }
          } catch (error) {
            console.log("Error reading user data:", error.message);
          }
        };

        const fetchCartData = async (userId) => {
          setCartIsLoading(true);
          try {
            const db = getDatabase();
            const userCartRef = ref(db, `user-cart/${userId}`);
            const dataSnapshot = await get(userCartRef);
            if (dataSnapshot.exists()) {
              const userData = dataSnapshot.val();
              setCartItems(userData.cartItems);
            }
            setCartIsLoading(false);
          } catch (error) {
            setCartIsLoading(false);
            console.error("Error fetching user data:", error);
          }
        };

        fetchUserData(user.uid);
        fetchCartData(user.uid);
      } else {
        setStatus(false);
        setCartIsLoading(false);
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <header className="flex items-center justify-between px-6 py-3">
      {mNavDisplay && (
        <div className='md:hidden fixed z-50 top-0 left-0 w-full h-[100vh] bg-white text-black p-5'>
          <div className='flex items-center justify-between'>
            <h2 className='text-xl font-medium'>Artsy</h2>
            <svg onClick={handleOffNav} className="fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512">
              <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
            </svg>
          </div>
          <nav className="flex flex-col items-left gap-6 mt-8">
            <Link onClick={handleOffNav} href="/" className="transition-all active:text-zinc-950 active:font-bold hover:underline">Home</Link>
            <Link onClick={handleOffNav} href="/Marketplace" className="transition-all active:text-zinc-950 active:font-bold hover:underline">Marketplace</Link>
            <Link onClick={handleOffNav} href="/Auctions" className="transition-all active:text-zinc-950 active:font-bold hover:underline">Auctions</Link>
            {!loggedInStatus && <Link onClick={handleOffNav} href='/Login' className='bg-black py-4 px-8 text-white w-fit'>Login</Link>}
            {loggedInStatus && (
              <Link onClick={handleOffNav} href='/Profile' className='bg-black py-4 px-8 text-white w-fit'>
                Profile
              </Link>
            )}
          </nav>
        </div>
      )}
      <div className='md:hidden' onClick={handleDisplayNav}>
        <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512">
          <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
        </svg>
      </div>
      <h1 className="text-xl font-bold">ARTSY.</h1>
      <nav className="hidden md:flex items-center gap-5">
        <Link href="/" className="transition-all active:text-zinc-950 active:font-bold hover:underline text-zinc-600">Home</Link>
        <Link href="/Marketplace" className="transition-all active:text-zinc-950 active:font-bold hover:underline text-zinc-600">Marketplace</Link>
        <Link href="/Auctions" className="transition-all active:text-zinc-950 active:font-bold hover:underline text-zinc-600">Auctions</Link>
      </nav>
      <div className="flex items-center">
        <SearchIcon />
        <Link href='/Cart'>
          <span className='relative'>
            <EmptyCart />
            <span className='absolute top-[5px] right-[17px] bg-red-500 text-white rounded-full p-[1px]'>{cartItems.length}</span>
          </span>
        </Link>
        <Link href='/Profile' className='hidden lg:block'>
          <Image src={ProfileIcon} width={39} height={39} className='cursor-pointer p-1' alt='Profile icon' />
        </Link>
      </div>
    </header>
  );
}

export default Header;
