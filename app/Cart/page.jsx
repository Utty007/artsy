/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React, { useEffect, useState } from 'react'
import CartItem from './Components/CartItem';
import Link from 'next/link';
import { useCartStore } from '../Store/CartStore';

function page() {
    const [cart, cartIsLoading, setCartIsLoading] = useCartStore(state => [state.cartItems, state.cartIsLoading, state.setCartIsLoading]);
    const [totalPrice, setTotalPrice] = useState(0);
    const price = totalPrice + 12
    useEffect(() => {
        const calculateTotalPrice = (cartItems) => {
        let totalPrice = 0;
        cartItems.forEach(item => {
            totalPrice += item.product.price * item.quantity;
        });
        setTotalPrice(totalPrice)
      }
        calculateTotalPrice(cart)
    }, [cart])
  return (
      <>
          {cartIsLoading && <span className="loading loading-spinner loading-lg block m-auto"></span>}
          {!cartIsLoading && cart.length === 0 ? <div className='text-center text-2xl font-bold my-28'>There are no items in the cart.</div>
              :
            !cartIsLoading && <div className='px-12'>
            {cart.map((items, index) => {
               return <CartItem key={index} props={items} />
            })}
            <hr />
            <div className='flex items-center justify-between gap-6 flex-wrap py-9'>
                <div className='flex flex-col gap-8 text-center'>
                    <Link className='py-4 px-14 bg-black text-white border-white text-lg' href='/Checkout'>Proceed To Checkout</Link>
                    <Link className='underline text-lg' href='/Marketplace'>Continue Shopping</Link>
                </div>
                <div className='text-[#888] font-medium text-lg w-[400px]'>
                    <h3 className='flex justify-between'><span>Products in cart:</span> <span>{cart.length} Items</span></h3>
                    <h3 className='flex justify-between my-6'><span>Shipping:</span><span> $12</span></h3>
                    <h3 className='flex justify-between'><span>Total:</span> <span>${price.toFixed(2)}</span></h3>
                </div>
            </div>
          </div>
           }
      </>
    
  )
}

export default page;