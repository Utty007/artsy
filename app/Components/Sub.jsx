import React from 'react'

function Sub() {
  return (
    <div className='md:border border-black md:p-8 mx-8 md:mx-16 my-8 text-left md:text-center'>
        <h2 className='text-2xl font-normal'>NEWSLETTER</h2>
        <h4 className='my-3 text-xs md:text-lg uppercase md:capitalize'>Subscribe to get daily updates on new drops and exciting deals.</h4>
        <div className='flex flex-col md:flex-row items-start md:items-center gap-4 md:justify-center'>
            <input className='border border-black text-[#333] px-4 py-2 outline-none' type="text" placeholder='ENTER YOUR EMAIL' name="Mail" /> <button className='bg-black text-white px-4 py-2'>SUBSCRIBE</button>
        </div>
    </div>
  )
}

export default Sub;