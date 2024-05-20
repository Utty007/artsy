/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React, {useState, useEffect} from 'react'
import { useCartStore } from '../Store/CartStore';
import { PaystackButton } from 'react-paystack';
import Link from 'next/link';
import { getAuth } from 'firebase/auth';
import { app } from '../Auth/firebase';
import { useRouter } from 'next/navigation';

function Checkout() {
    const [cart, userData, setCartItems] = useCartStore((state) => [state.cartItems, state.userData, state.setCartItems])
    const [totalPrice, setTotalPrice] = useState(0);
    const price = totalPrice;
    const auth = getAuth(app);
    const router = useRouter();
    useEffect(() => {
        const isLoggedIn = auth.onAuthStateChanged((user) => {
            if (user) {
                // Do nothing
            } else {
                router.push('/Login')
            }
        })
        const calculateTotalPrice = (cartItems) => {
        let totalPrice = 0 + 12;
        cartItems.forEach(item => {
            totalPrice += item.product.price * item.quantity;
        });
        setTotalPrice(totalPrice)
    }
        calculateTotalPrice(cart)

        if (cart.length === 0) {
            setTotalPrice(0)
        }
    }, [cart])

    const successHandler = () => {
        setCartItems([])
    }

    const closeHandler = () => {
        console.log('User closed the payment portal')
    }
    
    return (
        <div className='text-center bg-black text-white p-5 rounded-md w-[350px] md:w-[500px] m-auto'>
            <h3 className='text-2xl'>Product Summary</h3>
            {cart.length !== 0 ? <>
                <h2 className='mt-2 mb-3'>Number of items: {cart.length}</h2>
            <h4 className='mb-4'>Total Cost: ₦{price.toFixed(2)}</h4>
            <PaystackButton className="bg-white text-black rounded-md p-3" publicKey='pk_test_719e220fa7ebeeeeb46b998496d85671bd325ec1' email={userData?.email} name={userData?.name} amount={price * 100} text='Click To Make Payment' onSuccess={successHandler} onClose={closeHandler} />
            </> : <>
            <h3 className='mb-8 mt-2'>There are no Items in the cart</h3>
            <Link className="bg-white text-black rounded-md p-3" href='/Marketplace'>Continue Shopping</Link>
            </>}
        </div>
  )
}

export default Checkout;