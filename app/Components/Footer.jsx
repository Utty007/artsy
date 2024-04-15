import React from 'react'
import MailIcon from '../Assets/Icons/MailIcon';
import LocationIcon from '../Assets/Icons/LocationIcon';

function Footer() {
  return (
    <footer className='mx-16 pb-6'>
        <div className='flex items-center justify-between'>
            <h1 className='text-4xl font-bold uppercase text-[#292929] leading-[60px]'>Artsy.</h1>
           
             <ul>
               <li className='text-xl leading-9 font-normal'>Home</li>
               <li className='text-xl leading-9 font-normal'>Marketplace</li>
               <li className='text-xl leading-9 font-normal'>Auctions</li>
               <li className='text-xl leading-9 font-normal'>Drops</li>
            </ul>
            <ul>
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
        <h3 className='text-center text-xl font-medium text-[#333] mt-8'>Artsystudios &copy; 2022. All Rights Reserved.</h3>
    </footer>
  )
}

export default Footer;
// font-family: Satoshi;
// font-size: 26px;
// font-weight: 400;
// line-height: 35.1px;
// text-align: left;

