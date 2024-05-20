import React from 'react'
import MailIcon from '../Assets/Icons/MailIcon';
import LocationIcon from '../Assets/Icons/LocationIcon';
import Sub from './Sub';

function Footer() {
  return (
    <footer className='pb-6'>
        <Sub />
        <div className='flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-0 justify-between mx-8 md:mx-16'>
            <h1 className='text-4xl hidden md:block font-bold uppercase text-[#292929] leading-[60px]'>Artsy.</h1>
            <h2 className='text-xl font-medium block md:hidden'>REACH US</h2>
             <ul className='hidden md:block'>
               <li className='text-xl leading-9 font-normal'>Home</li>
               <li className='text-xl leading-9 font-normal'>Marketplace</li>
               <li className='text-xl leading-9 font-normal'>Auctions</li>
               <li className='text-xl leading-9 font-normal'>Drops</li>
            </ul>
            <ul className='hidden md:block'>
                <li className='text-xl leading-9 font-normal'>Blog</li>
                <li className='text-xl leading-9 font-normal'>Wallets</li>
                <li className='text-xl leading-9 font-normal'>Rates</li>
                <li className='text-xl leading-9 font-normal'>High bids</li>
            </ul>
            <div>
                <div className='flex items-center'>
                    <MailIcon /> <span className='text-xl leading-9 font-normal'>artsystudios@gmail.com</span>
                </div>
                <div className='flex items-center'>
                    <LocationIcon /> <span className='text-xl leading-9 font-normal'>Lagos, Nigeria</span>
                </div>
            </div>
           </div>
        <h3 className='hidden md:block text-center text-xl font-medium text-[#333] mt-8'>Artsystudios &copy; 2022. All Rights Reserved.</h3>
    </footer>
  )
}

export default Footer;
// font-family: Satoshi;
// font-size: 26px;
// font-weight: 400;
// line-height: 35.1px;
// text-align: left;

