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
        <Image width={600} height={300} src={props.Image} alt="Product Image" />
        <div className='max-w-[600px] flex flex-col gap-5'>
            <h1 className='text-[#333] text-4xl font-medium'>{props.name}</h1>
            <p className=' text-xl font-normal leading-8'>Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor pur</p>
            <div className='flex items-center gap-9'>
                <div className='flex items-center'>
                    <span className='flex items-center'>
                        <Image src={creatorOne} alt='Creator Image' />
                        <Image className='relative left-[-20px]' src={creatorTwo} alt='Creator Image' />
                        <Image className='relative left-[-40px]' src={creatorThree} alt='Creator Image' />
                        <Image className='relative left-[-60px]' src={creatorFour} alt='Creator Image' />
                        <Image className='relative left-[-80px]' src={creatorFive} alt='Creator Image' />
                    </span>
                    <span className='relative left-[-70px]'>64 Major Creators</span>
                </div>
                <div>
                    <Image src={arrowIcon} alt='Arrow Icon' />
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductItem;
