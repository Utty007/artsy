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
        { name: "PHILOMENA '22", img: ProductImgOne, id: 'philomena22' },
        { name: 'BOOLEAN EGYPTIAN', img: ProductImgTwo, id: 'boolegyptian' },
        { name: 'BLANC', img: ProductImgThree, id: 'blanc' },
        { name: 'ELLIPSIA', img: ProductImgFour, id: 'ellipsia' },
        { name: 'THE LAWMAKERS', img: ProductImgFive, id: 'thelawmakers' },
        { name: 'VEIL', img: ProductImgSix, id: 'veil' },
        { name: 'ALTERNATING', img: ProductImgSeven, id: 'alternating' },
        { name: "ROSEMARY '22", img: ProductImgEight , id: 'rosemary22'},
        { name: 'BEVERLY', img: ProductImgNine, id: 'beverly' }
    ]
    const [spliceNum, setSpliceNum] = useState(6)
    const [SMV, setSMV] = useState(true)
    const seeMore = () => { 
        console.log('Clicked');
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
                    <h3 className='text-2xl font-bold'>{`$3.90`}</h3>
                </div>
            </Link>
        })}
        </div>
        {SMV && <button onClick={()=> {seeMore()}} className='border border-black p-2 rounded-md flex justify-center my-5 mx-auto'>See More</button>}
    </div>
  )
}

export default ProductsList;