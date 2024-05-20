/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image';
import React from 'react';
import Carousel from './Carousel';
import prodImgTwo from '@/app/Assets/AuctionImages/prodImgTwo.png';
import prodImgOne from '@/app/Assets/AuctionImages/prodImgOne.png'
import HeartSk from '../Assets/Icons/HeartSk';
import Footer from '../Components/Footer';

function page() {
  return (
    <div className='px-2 md:px-12'>
      <h3 className='pt-5 font-medium'><span className='font-light'>Home/</span> Auctions</h3>
      <h3 className='py-5 font-medium text-xl'>Here's an overview of products actively on auction, explore!</h3>
      <Carousel />

      <h3 className='my-11'>Top bids from popular creators</h3>

      <div className='flex items-center gap-6 flex-wrap justify-between'>
        <div>
          <div className='flex gap-2 flex-col bg-white rounded-md shadow-md px-4 py-3 max-w-[545px]'>
            <Image src={prodImgOne} alt='Slider Image' />
            <div>
                <h3 className='font-medium text-xl'>
                  Out of the box
                </h3>
            </div>
          </div>
        <div className='px-2'>
          <h3 className='text-[#616161] font-medium mt-6'>Creator: <span className='text-black'>Dan Murray</span></h3>
          <h3 className='text-[#616161] font-medium mt-6'>Date: <span className='text-black'>12/08/22</span></h3>
          <h3 className='text-[#616161] font-medium mt-6 mb-6'>Highest Bid: <span className='text-black'>0.57 ETH</span></h3>
          <div className='flex items-center justify-between md:justify-normal gap-2 w-full md:w-[200px] bg-[#f6f4f4] p-3 flex-grow'>
            <div>
              <h3 className='text-[#616161] font-medium'>Current Bid</h3>
              <p className='text-black font-medium'>0.987 ETH</p>
            </div>
            <button className='p-2 bg-black block text-white rounded-sm'>
              Place bid
            </button>
          </div>
        </div>
      </div>
      <div className='mb-9'>
          <div className='flex gap-2 flex-col bg-white rounded-md shadow-md px-4 py-3 max-w-[545px]'>
          <Image src={prodImgTwo} alt='Slider Image' />
          <div>
              <h3 className='font-medium text-xl'>
                Falling Apart
              </h3>
          </div>
        </div>
        <div className='px-2'>
          <h3 className='text-[#616161] font-medium mt-6'>Creator: <span className='text-black'>Jacob Banks</span></h3>
          <h3 className='text-[#616161] font-medium mt-6'>Date: <span className='text-black'>12/08/22</span></h3>
          <h3 className='text-[#616161] font-medium mt-6 mb-6'>Highest Bid: <span className='text-black'>0.34 ETH</span></h3>
          <div className='flex justify-between md:justify-normal items-center gap-2 w-full md:w-[200px] bg-[#f6f4f4] p-3 flex-grow'>
            <div>
              <h3 className='text-[#616161] font-medium'>Current Bid</h3>
              <p className='text-black font-medium'>0.99 ETH</p>
            </div>
            <button className='p-2 bg-black text-white rounded-sm'>
              Place bid
            </button>
          </div>
        </div>
       </div>
      </div>
      <Footer />
    </div>
  )
}

export default page;