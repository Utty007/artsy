import React from 'react';
import Image from 'next/image';
import SCOne from '@/app/Assets/sc1.png';
import SCTwo from '@/app/Assets/sc2.png';
import SCThree from '@/app/Assets/sc3.png';
import SCFour from '@/app/Assets/sc4.png';
import SCFive from '@/app/Assets/sc5.png';
import imgStack from '@/app/Assets/imgStack.png'

function Carousel() {
  return (
    <>
      <div className='rounded-box carousel md:flex items-center gap-4 w-full hidden'>
            <div className='carousel-item'>
              <Image src={SCOne} alt='Slider Image' />
            </div>
            <div className='carousel-item'>
              <Image src={SCTwo} alt='Slider Image' />
            </div>
            <div className='carousel-item'>
              <Image src={SCThree} alt='Slider Image' />
            </div>
            <div className='carousel-item'>
              <Image src={SCFour} alt='Slider Image' />
            </div>
            <div className='carousel-item'>
              <Image src={SCFive} alt='Slider Image' />
            </div>  
      </div>
      <div className="relative w-full mt-5 flex items-center justify-center md:hidden">
        <Image src={imgStack} alt='Stack of images' />
      </div>
    </>
  )
}

export default Carousel;