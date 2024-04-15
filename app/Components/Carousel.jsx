import React from 'react';
import Image from 'next/image';
import SCOne from '@/app/Assets/sc1.png';
import SCTwo from '@/app/Assets/sc2.png';
import SCThree from '@/app/Assets/sc3.png';
import SCFour from '@/app/Assets/sc4.png';
import SCFive from '@/app/Assets/sc5.png';

function Carousel() {
  return (
      <div className='flex items-center gap-2' data-slick='{"slidesToShow": 4, "slidesToScroll": 4}'>
        <div>
          <Image src={SCOne} alt='Slider Image' />
        </div>
        <div>
          <Image src={SCTwo} alt='Slider Image' />
        </div>
        <div>
          <Image src={SCThree} alt='Slider Image' />
        </div>
        <div>
          <Image src={SCFour} alt='Slider Image' />
        </div>
        <div>
          <Image src={SCFive} alt='Slider Image' />
        </div>  
    </div>
  )
}

export default Carousel