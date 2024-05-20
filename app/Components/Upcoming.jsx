import React from 'react'
import Image from 'next/image'
import Arrow from '@/app/Assets/Arrow.png'
import LeftArrowIcon from '../Assets/Icons/LeftArrowIcon';
import RightArrowIcon from '../Assets/Icons/RightArrowIcon';

function Upcoming() {
  return (
    <div className='gradientBg w-full mt-20 px-12 py-12 md:pt-5 md:pb-8 text-[#fff]'>
        <h1 className='text-3xl hidden md:block font-medium leading-[50px]'>See Upcoming Auctions And Exhibitions</h1>
        <Image src={Arrow} alt='Arrow' width={450} className='relative hidden md:block left-[50px] pb-4' />
        <div className='imageBg md:height-[500px] flex flex-col lg:flex-row items-end justify-between p-9'>
            <div className='flex items-center flex-row gap-4'>
                <div className='text-4xl md:text-6xl leading-[80px] text-[#e1e1e1]'>
                    01
                </div>
                <div className='flex flex-col gap-10 md:gap-4'> 
                    <div className='flex items-center gap-4'>
                        <li className='text-xl md:text-3xl block md:list-item text-[#e1e1e1] relative left-[-40px]'>MONALISA REDEFINED IN STYLE</li>
                    </div>
                    <span>
                        Start on : 08:00 GTS . Monday 
                    </span>
                    <p className='text-xs md:text-lg font-normal md:font-medium'>
                        GET EXCLUSIVE VIEWING OF CONTEMPORARY ART AND CONNECT WITH <br className='hidden md:block' /> INVESTORS AND AUCTIONEERS ACROSS THE WORLD BRINGING THEIR <br className='hidden md:block'/> HIGHEST AND LOWEST BIDS.
                    </p>
                </div>
            </div>
            <div className='flex items-center gap-3'>
                <h2 className='underline text-xl'>See More</h2>
                <button className='border rounded-xl border-white p-3'>Set A Reminder</button>
            </div>
        </div>
        
        
        <div className='hidden lg:flex items-center justify-between mt-5'>
            <div className='w-[400px] h-2 bg-[#aeaeae] rounded-lg'>
                <span className='w-[80px] h-2 bg-white rounded-lg block'></span>
            </div>
            <div className='flex items-center gap-3'>
                <span className='bg-white bg-opacity-20 w-14 h-14 rounded-full flex items-center'> <LeftArrowIcon /> </span>
                <span className='bg-white bg-opacity-20 w-14 h-14 rounded-full flex items-center'> <RightArrowIcon /> </span>
            </div>
        </div>
    </div>
  )
}

export default Upcoming;