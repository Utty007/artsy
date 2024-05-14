'use client'
import React, { useState } from 'react'
import Image from 'next/image';
import ProductImgOne from '@/app/Assets/ProductImages/PIOne.png'
import ProductImgTwo from '@/app/Assets/ProductImages/PITwo.png'
import ProductImgThree from '@/app/Assets/ProductImages/PIThree.png'
import ProductImgFour from '@/app/Assets/ProductImages/PIFour.png'
import ProductImgFive from '@/app/Assets/ProductImages/PIFive.png'
import ProductImgSix from '@/app/Assets/ProductImages/PISix.png'
import ProductImgSeven from '@/app/Assets/ProductImages/PISeven.png'
import ProductImgEight from '@/app/Assets/ProductImages/PIEight.png'
import ProductImgNine from '@/app/Assets/ProductImages/PINine.png'
import Link from 'next/link';

function ProductsList() {
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
    const [spliceNum, setSpliceNum] = useState(6)
    const [SMV, setSMV] = useState(true)
    const seeMore = () => { 
        setSpliceNum(9);
        setSMV(false)
    }
  return (
    <div className='max-w-[925px] px-6'>
        <div className='flex items-center justify-between flex-wrap '>
            {Products.splice(0, spliceNum).map((items, index)=> {
            return <Link href={`/Marketplace/${items.id}`} key={index} className='bg-white shadow-md p-2 rounded-md mb-6'>
                <div>
                    <Image src={items.img} alt='Product Image' />
                </div>
                <div>
                    <h3 className='text-xl my-2'>{items.name}</h3>
                    <h3 className='text-2xl font-bold'>${items.price}</h3>
                </div>
            </Link>
        })}
        </div>
        {SMV && <button onClick={()=> {seeMore()}} className='border border-black p-2 rounded-md flex justify-center my-5 mx-auto'>See More</button>}
    </div>
  )
}

export default ProductsList;