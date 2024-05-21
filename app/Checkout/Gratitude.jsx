import React from 'react';
import gratImage from '@/app/Assets/delivered.png';
import partyPopper from '@/app/Assets/party-popper.png'
import Image from 'next/image';
import { useCartStore } from '../Store/CartStore';

function Gratitude() {
    const [userInfo] = useCartStore(state => [state.userData])
  return (
    <div className='bg-white flex flex-col items-center justify-center w-full h-[600px] absolute top-0 bottom-0 left-0 text-black'>
        <Image src={gratImage} alt='Woman receiving her delivery artwork' />
        <h3 className='text-xl font-medium capitalize'>Hey {userInfo?.firstName}, thank you for your purchase.</h3>
        <div className='flex items-center'>
            <h3 className='text-lg capitalize'>You are amazing. Cheers to being artsy.</h3>
            <Image src={partyPopper} alt='Party Popper' />
        </div>
    </div>
  )
}

export default Gratitude;