import React from 'react';
import Carousel from '../Components/Carousel';
import Products from '../Components/Products';
import Upcoming from '../Components/Upcoming';
import Image from 'next/image';
import arrowIcon from '@/app/Assets/Icons/arrowIcon.png';
import Section from '../Components/Section';

function Main() {
  return (
      <div className='w-full'>
        <div className='max-w-[70%] m-auto'>
          <h1 className='text-6xl text-center text-[#292929] font-[500] leading-snug mt-14'>Photography is poetry & beautiful <br />untold stories</h1>
          <p className='text-center text-2xl font-[500] font-Satoshi'>Flip through more than 10,000 vintage shots, old photograghs, historic images and captures seamlessly in one place. Register to get top access.</p>
        </div>
        <Carousel />
        <Products />
        <Upcoming />
        <div className='my-24'>
          <div className='flex items-center justify-between border border-y-black border-transparent p-8'>
            <h2 className='text-4xl'>Explore Marketplace</h2>
            <Image src={arrowIcon} alt='Arrow Icon' />
          </div>
          <div className='flex items-center justify-between border border-transparent border-b-black p-8'>
            <h2 className='text-4xl'>See Auctions</h2>
            <Image src={arrowIcon} alt='Arrow Icon' />
          </div>
        </div>
        <Section />
      </div>
  )
}

export default Main

///* Photography is poetry & beautiful untold stories */

// font-family: Satoshi;
// font-size: 48px;
// font-weight: 500;
// line-height: 64.8px;
// text-align: left;


