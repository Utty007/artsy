'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Delete from '@/app/Assets/Icons/Delete';
import { useCartStore } from '@/app/Store/CartStore';
import { getDatabase, update, ref } from 'firebase/database';
import { app } from '@/app/Auth/firebase';
import { getAuth } from 'firebase/auth';
import { FetchUserData } from '@/app/Auth/firebaseService';

export const updateUserData = async (userId, cartItems) => {
    try {
        const db = getDatabase();
        const userCartRef = ref(db, `user-cart/${userId}`);
        
        // Update the cartItems data at the user-cart reference
        await update(userCartRef, {
            cartItems: cartItems
        });
    } catch (error) {
        console.error("Error updating cart items:", error);
    }
};

function CartItem(props) {
    const [addToCart, reduceFromCart, deleteFromCart] = useCartStore(state => [state.addItemsToCart, state.reduceFromCart, state.deleteFromCart])
    const addToCartHandler = () => {
        addToCart(props.props)
    }

    const reductionHandler = () => {
        reduceFromCart(props.props)
    }

    const deleteHandler = () => {
        deleteFromCart(props.props)
    }

    const [user, setUser] = useState()
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);

  return (
      <div>
        <div className='flex items-center justify-between gap-8 py-4'>
        <div className='flex items-center gap-8'>
            <Image src={props.props.product.img} className='w-[100px] h-[100px] md:w-[200px] md:h-[200px]' alt="Product Image"  />
            <div className='flex flex-col gap-3'>
                <h3 className='text-xl font-medium'>{props.props.product.name}</h3>
                <p>Clearamane</p>
                <p>size: 200ft</p>
                <div className='flex items-center'>
                    <button className='border md:border-none border-black rounded-l-md py-1 px-2' onClick={()=> {reductionHandler()}}>-</button>
                    <span className='border md:border-none border-black py-1 px-2'>{props.props.quantity}</span>
                    <button onClick={()=> {addToCartHandler()}} className='border md:border-none py-1 px-2 border-black rounded-r-md'>+</button></div>
            </div>
        </div>
        <div className='flex flex-col gap-12 justify-between items-center'>
            <Delete onClick={()=> {deleteHandler()}} />
            <h3 className='text-xl md:text-2xl font-medium md:font-bold'>
                ₦{props.props.product.price * props.props.quantity}
            </h3>
        </div>
        </div>
      </div>
  )
}

export default CartItem;