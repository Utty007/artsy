/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { get, getDatabase, ref } from 'firebase/database'
import RA from '@/app/Assets/Icons/RA'
import HeartIcon from '@/app/Assets/Icons/HeartIcon'
import ArrowUp from '@/app/Assets/Icons/ArrowUp'
import LAI from '@/app/Assets/Icons/LAI'
import RAI from '@/app/Assets/Icons/RAI'
import Carousel from '@/app/Marketplace/Components/Carousel'
import { useCartStore } from '@/app/Store/CartStore'

const Page = () => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [success, toggleSuccess] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [showDesc, setShowDesc] = useState(false)

  const handleShowDesc = () => {
    setShowDesc(!showDesc)
  }

  const fetchProducts = async () => {
    setIsLoading(true)
    const db = getDatabase();
    const productRef = ref(db, 'Products/Products')

    const dataSnapshot = await get(productRef)

    if (dataSnapshot.exists()) {
      const productsData = dataSnapshot.val();
      setProducts(productsData)
    } else {
      console.log('An error occurred.')
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const id = useParams();   
  const product = products.find(item => item.id === id.ProductId)

  const increment = () => {
    setQuantity(quantity + 1)
  }
  
  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const [addToCart] = useCartStore(state => [state.addItemsToCart])

  const addToCartHandler = (product) => {
    const productItem = {
      product: product,
      quantity: quantity
    }
    addToCart(productItem);
    setQuantity(1)
    toggleSuccess(true)

    setTimeout(() => {
      toggleSuccess(false)
    }, 3000)
  }

  if (isLoading) {
    return <div className='px-6 my-14 relative'><span className='loading loading-spinner loading-lg block m-auto'></span></div>
  }

  if (!product) {
    return <div className='px-6 relative'><h2>Product not found</h2></div>
  }

  return (
    <div className='px-6 relative'>
      <h3 className='my-6'>Home/Marketplace/Editorials/<span className='font-medium'>{product.name}</span></h3>
      {success && <div role="alert" className={`alert alert-success fixed bottom-5 right-5 w-[400px] text-white shadow-lg`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>Item successfully added to cart.</span>
      </div>}
      <Image className='block mb-5 md:hidden m-auto w-full' width={300} height={300} src={product.img} alt='Product Image' />
      <table className='border box-border border-black m-auto'>
        <tr className='border border-black h-[65px]'>
          <td rowSpan={5} className='p-4 hidden md:table-cell border border-black'>
            <Image src={product.img} alt='Product Image' width={300} height={400} />
          </td>
          <td rowSpan={1} className='flex items-center justify-between gap-8 p-2'>
            <h2 className='text-3xl font-bold'>{product.name}</h2>
            <h3 className='text-2xl font-bold'>₦{product.price}</h3>
          </td>
        </tr>
        <tr className='border border-black'>
          <td className='p-2'>
            <h3 className='text-[#616161] text-xl font-normal'>Creator: <span className='text-[#4693ed]'>{product.creatorName}</span></h3>
            <h3 className='text-lg py-2'>Made in Italy</h3>
            <h3 className='text-xl font-medium'>Total views: <span>1.7k Views</span></h3>
            <div className='flex items-center gap-2 text-[#333] text-lg mb-3'>
              <span className='cursor-pointer' onClick={decrement}>-</span> <span>{quantity}</span> <span className='cursor-pointer' onClick={increment}>+</span>
            </div>
            <div className='flex items-center gap-5 mb-3'>
              <button className='bg-black text-white p-3 border border-white flex items-center' onClick={() => addToCartHandler(product)}>Add To Cart <RA /></button>
              <HeartIcon />
            </div>
          </td>
        </tr>
        <tr className='border border-black'>
          <td className='p-2 md:max-w-[300px]'>
            <div onClick={handleShowDesc} className='flex flex-row items-center justify-between cursor-pointer'>
              <h3 className='text-xl font-medium'>Descriptions</h3>
              {showDesc? <ArrowUp /> : <div className='rotate-180'> <ArrowUp /></div>}
            </div>
            {showDesc && <div className='text-[16px] pt-1'>
              {product.description}
            </div>}
          </td>
        </tr>
        <tr className='border border-black'>
          <td className='flex items-center justify-between p-2'>
            <h3 className='text-xl font-medium'>Listings</h3>
            <ArrowUp />
          </td>
        </tr>
        <tr className='border border-black'>
          <td className='flex items-center justify-between p-2'>
            <h3 className='text-xl font-medium'>Status</h3>
            <ArrowUp />
          </td>
        </tr>
      </table>
      <div className='flex items-center justify-between w-full md:w-9/12 mx-auto shadow-lg p-4 rounded-md my-7'>
        <h3 className='font-medium'>Explore more from this collection</h3>
        <div className='flex items-center gap-4'>
          <span className='border border-[#616161] rounded-full p-2'>
            <LAI />
          </span>
          <span className='border border-[#616161] p-2 rounded-full'>
            <RAI />
          </span>
        </div>
      </div>
      <div className='mx-12 box-border'>
        <Carousel />
      </div>
      <button className='border border-black p-4 text-black font-medium block mx-auto rounded-md my-4'>Explore All</button>
    </div>
  )
}

export default Page;
