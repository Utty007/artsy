/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React, { useState } from 'react'
import ProductImgOne from '@/app/Assets/ProductImages/PIOne.png'
import ProductImgTwo from '@/app/Assets/ProductImages/PITwo.png'
import ProductImgThree from '@/app/Assets/ProductImages/PIThree.png'
import ProductImgFour from '@/app/Assets/ProductImages/PIFour.png'
import ProductImgFive from '@/app/Assets/ProductImages/PIFive.png'
import ProductImgSix from '@/app/Assets/ProductImages/PISix.png'
import ProductImgSeven from '@/app/Assets/ProductImages/PISeven.png'
import ProductImgEight from '@/app/Assets/ProductImages/PIEight.png'
import ProductImgNine from '@/app/Assets/ProductImages/PINine.png'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import EthIcon from '@/app/Assets/Icons/EthIcon'
import RA from '@/app/Assets/Icons/RA'
import HeartIcon from '@/app/Assets/Icons/HeartIcon'
import ArrowUp from '@/app/Assets/Icons/ArrowUp'
import LAI from '@/app/Assets/Icons/LAI'
import RAI from '@/app/Assets/Icons/RAI'
import Carousel from '@/app/Marketplace/Components/Carousel'
import { useCartStore } from '@/app/Store/CartStore'

function page() {
    const Products = [
        { name: "Philomena '22", img: ProductImgOne, id: 'philomena22', price: 250 },
        { name: 'Boolean Egyptian', img: ProductImgTwo, id: 'boolegyptian', price: 200 },
        { name: 'Blanc', img: ProductImgThree, id: 'blanc', price: 360 },
        { name: 'Ellipsia', img: ProductImgFour, id: 'ellipsia', price: 250 },
        { name: 'The Lawmakers', img: ProductImgFive, id: 'thelawmakers', price: 250 },
        { name: 'Veil', img: ProductImgSix, id: 'veil', price: 125 },
        { name: 'Alternating', img: ProductImgSeven, id: 'alternating', price: 230 },
        { name: "Rosemary '22", img: ProductImgEight , id: 'rosemary22', price: 320},
        { name: 'Beverly', img: ProductImgNine, id: 'beverly', price: 170 }
    ]
    const id = useParams();    
    const product = Products.find(items => items.id === id.ProductId)
    const [quantity, setQuantity] = useState(1)
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
    }
  return (
    <div className='px-6'>
      <h3 className='my-6'>Home/Marketplace/Editorials/<span className='font-medium'>{product.name}</span></h3>
      <table className='border border-black m-auto'>
        <tr className='border border-black h-[65px]'>
          <td rowSpan={5} className='p-4 border border-black'>
            <Image src={product.img} alt='Product Image' height={400} />
          </td>
          <td rowSpan={1} className='flex items-center justify-between gap-8 p-2'>
            <h2 className='text-3xl font-bold'>{product.name}</h2>
            <div className='flex items-center'>
              <EthIcon />
              <h3 className='text-2xl font-bold'>{product.price}</h3>
            </div>
          </td>
        </tr>
        <tr className='border border-black'>
          <td className='p-2'>
            <h3 className='text-[#616161] text-xl font-normal'>Creator: <span className='text-[#4693ed]'>Ali Dawa</span></h3>
            <h3 className='text-lg py-2'>Made in Italy</h3>
            <h3 className='text-xl font-medium'>Total views: <span>1.7k Views</span></h3>
            <div className='flex items-center gap-2 text-[#333] text-lg mb-3'>
              <span className='cursor-pointer' onClick={()=> {decrement()}}>-</span> <span>{quantity}</span> <span className='cursor-pointer' onClick={()=> {increment()}}>+</span>
            </div>
            <div className='flex items-center gap-5 mb-3'>
              <button className='bg-black text-white p-3 border border-white flex items-center' onClick={()=> {addToCartHandler(product)}}>Add To Cart <RA /></button>
              <HeartIcon />
            </div>
          </td>
        </tr>
        <tr className='border border-black'>
          <td className='flex items-center justify-between p-2'>
            <h3 className='text-xl font-medium'>Descriptions</h3>
            <ArrowUp />
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

      <div className='flex items-center justify-between w-9/12 mx-auto shadow-lg p-4 rounded-md my-7'>
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

export default page;