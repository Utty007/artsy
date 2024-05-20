import React from 'react'
import Slideshow from './ImageShuffle';

function Section() {
  return (
    <div className='bg-[#e2e2e2] p-4 md:p-10 pr-16 relative w-full overflow-hidden'>
        <div className='flex gap-4 md:hidden absolute top-0 right-[-5px]'>
              <p>Editorials</p>
              <li>Fashion</li>
              <li>Lifestyle</li>
        </div>
        <div className='flex items-start justify-between'>
            <h2 className='text-[#161616] text-2xl md:text-5xl font-semibold'>TOP CREATORS OF <br /> THE WEEK</h2>
            <div className='md:flex items-center gap-4 hidden'>
                <div className='h-48 bg-[#aeaeae] w-1 rounded-lg flex items-end'><span className='h-8 bg-[#292929] block rounded-lg w-1'></span></div>
                <div className='flex flex-col gap-2'>
                    <span className='text-3xl font-normal text-[#333]'>Editorials</span>
                    <span className='text-3xl font-normal text-[#333]'>Fashion</span>
                    <span className='text-3xl font-normal text-[#333]'>Lifestyle</span>
                    <span className='text-3xl font-normal text-[#333]'>Blueprint</span>
                </div>
            </div>
        </div>
        <div className='absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] m-auto bottom-0 right-0'>
            <Slideshow />
        </div>
        <div className='w-[80%] m-auto'>
            <p className='text-xs md:text-2xl leadng-[40px] font-extralight'>“Everything always looked better in black and white. Everything always  as if it were the first time; there’s always more people in a black and white photograph. It just makes it seem that there were more people at a gig, more people at a football match, than with colour photography. Everything looks more exciting.”– Jack Lowden</p>
            <h3 className='text-[#333] text-3xl font-bold leading-[75px] text-right relative top-[-100px]'>CIRCA</h3>
            <h3 className='text-[#161616] line-through text-9xl leading-[150px] text-right'>1985</h3>
        </div>
    </div>
  )
}

export default Section;