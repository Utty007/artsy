import React from 'react';
import Image from 'next/image';
import SCOne from '@/app/Assets/ProductImages/productImg10.png';
// import SCTwo from '@/app/Assets/sc2.png';
import SCThree from '@/app/Assets/sc3.png';
import SCFour from '@/app/Assets/sc4.png';
import SCFive from '@/app/Assets/sc5.png';
import LoveIcon from '@/app/Assets/Icons/LoveIcon';
import EthIcon from '@/app/Assets/Icons/EthIcon';

function Carousel() {
  return (
      <div className='carousel flex items-center gap-4 w-full'>
          <div className='carousel-item flex gap-2 flex-col border border-black px-4 py-1'>
            <div className='flex justify-end'>
                <LoveIcon />
            </div>
            <Image src={SCOne} alt='Slider Image' className='w-[250px] h-[250px]' />
            <div className='flex items-center justify-between'>
                <h3>Sassy</h3>
                <span className='flex items-center'>
                    <EthIcon /> 3.20
                </span>
            </div>
          </div>
          <div className='carousel-item flex gap-2 flex-col border border-black px-4 py-1'>
            <div className='flex justify-end'>
                <LoveIcon />
            </div>
            <Image src={SCThree} alt='Slider Image' className='w-[250px] h-[250px]' />
            <div className='flex items-center justify-between'>
                <h3>Escape</h3>
                <span className='flex items-center'>
                    <EthIcon /> 3.20
                </span>
            </div>
          </div>
          <div className='carousel-item flex gap-2 flex-col border border-black px-4 py-1'>
            <div className='flex justify-end'>
                <LoveIcon />
            </div>
            <Image src={SCFour} alt='Slider Image' className='w-[250px] h-[250px]' />
            <div className='flex items-center justify-between'>
                <h3>Ellipsia</h3>
                <span className='flex items-center'>
                    <EthIcon /> 3.20
                </span>
            </div>
          </div>
          <div className='carousel-item flex gap-2 flex-col border border-black px-4 py-1'>
            <div className='flex justify-end'>
                <LoveIcon />
            </div>
            <Image src={SCOne} alt='Slider Image' className='w-[250px] h-[250px]' />
            <div className='flex items-center justify-between'>
                <h3>Ruby</h3>
                <span className='flex items-center'>
                    <EthIcon /> 3.20
                </span>
            </div>
          </div>
          <div className='carousel-item flex gap-2 flex-col border border-black px-4 py-1'>
            <div className='flex justify-end'>
                <LoveIcon />
            </div>
            <Image src={SCFive} alt='Slider Image' className='w-[250px] h-[250px]' />
            <div className='flex items-center justify-between'>
                <h3>Sassy</h3>
                <span className='flex items-center'>
                    <EthIcon /> 3.20
                </span>
            </div>
          </div>
    </div>
  )
}

export default Carousel;