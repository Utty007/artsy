'use client'
import SearchIconG from '@/app/Assets/Icons/SearchIconG'
import { useCartStore } from '@/app/Store/CartStore';
import React from 'react'

function SubHeader() {
    const setSortOrder = useCartStore(state => state.setSortOrder) // Get the setter for sort order from Zustand
    const handleSortChange = (e) => {
        const value = e.target.value;
        if (value === 'Ascending') {
            setSortOrder('asc');
        } else if (value === 'Descending') {
            setSortOrder('desc');
        } else {
            setSortOrder('default');
        }
    }

  return (
    <div className='flex items-center justify-between md:px-6'>
        <div className='w-[200px] p-2 bg-[#f4f2f2] text-[#999] hidden md:flex items-center gap-3 rounded-lg'>
            <SearchIconG />
            <input type="text" name="Search" placeholder='Search' className='bg-transparent'/>
        </div>
        <div className='flex items-center justify-between p-2 rounded-lg w-full md:w-[900px] shadow-md'>
            <h3>Showing all results.</h3>
            <div className='border border-black p-2 rounded-lg'>
                <select name="Sort" className='outline-none' onChange={handleSortChange}>
                    <option value="Default">Sort</option>
                    <option value="Ascending">Ascending</option>
                    <option value="Descending">Descending</option>
                </select>
            </div>
        </div>
    </div>
  )
}

export default SubHeader;