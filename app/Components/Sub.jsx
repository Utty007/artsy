import React from 'react'

function Sub() {
  return (
    <div className='border border-black p-8 mx-16 my-8 text-center'>
        <h2 className='text-2xl font-normal'>NEWSLETTER</h2>
        <h4 className='my-3'>Subscribe to get daily updates on new drops and exciting deals.</h4>
        <div className='flex items-center gap-4 justify-center'>
            <input className='border border-black text-[#333] px-4 py-2 outline-none' type="text" placeholder='ENTER YOUR EMAIL' name="Mail" /> <button className='bg-black text-white px-4 py-2'>SUBSCRIBE</button>
        </div>
    </div>
  )
}

export default Sub;