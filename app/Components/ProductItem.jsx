import React from 'react';
import Image from 'next/image';
import creatorOne from '@/app/Assets/creatorOne.png';
import creatorTwo from '@/app/Assets/creatorTwo.png'
import creatorThree from '@/app/Assets/creatorThree.png'
import creatorFour from '@/app/Assets/creatorFour.png'
import creatorFive from '@/app/Assets/creatorFive.png'
import arrowIcon from '@/app/Assets/Icons/arrowIcon.png'

function ProductItem(props) {
  return (
    <div className={props.className}>
        <div className='block md:hidden relative'>
            <Image src={props.mImage}  alt='Product Image'/>
            <h3 className='text-white font-bold text-xl absolute top-[40%] left-0 right-0 uppercase text-center'>{props.name}</h3>
        </div>
        <Image src={props.Image} className='hidden md:block' alt="Product Image" />
        <div className='max-w-[600px] flex flex-col gap-5'>
            <h1 className='text-[#333] hidden md:block text-4xl font-medium'>{props.name}</h1>
            <p className='text-lg md:text-xl font-normal leading-8'>Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor pur</p>
            <div className='flex items-center gap-9'>
                <div className='flex items-center'>
                    <span className='flex items-center'>
                        <Image src={creatorOne} alt='Creator Image' />
                        <Image className='relative left-[-20px]' src={creatorTwo} alt='Creator Image' />
                        <Image className='relative left-[-40px]' src={creatorThree} alt='Creator Image' />
                        <Image className='relative left-[-60px]' src={creatorFour} alt='Creator Image' />
                        <Image className='relative left-[-80px]' src={creatorFive} alt='Creator Image' />
                    </span>
                    <span className='relative md:left-[-70px]'>64 Major Creators</span>
                </div>
                <div className='hidden md:block'>
                    <Image src={arrowIcon} alt='Arrow Icon' />
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductItem;
