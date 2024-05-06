import SearchIconG from '@/app/Assets/Icons/SearchIconG'
import React from 'react'

function SubHeader() {
  return (
    <div className='flex items-center justify-between px-6'>
        <div className='w-[200px] p-2 bg-[#f4f2f2] text-[#999] flex items-center gap-3 rounded-lg'>
            <SearchIconG />
            <input type="text" name="Search" placeholder='Search' className='bg-transparent'/>
        </div>
        <div className='flex items-center justify-between p-2 rounded-lg w-[900px] shadow-md'>
            <h3>See 1-6 of 15 results</h3>
            <div className='border border-black p-2 rounded-lg'>
                <select name="Sort" className='outline-none'>
                    <option value="Default">Sort By</option>
                    <option value="Ascending">Ascending</option>
                    <option value="Descending">Descending</option>
                </select>
            </div>
        </div>
    </div>
  )
}

export default SubHeader;