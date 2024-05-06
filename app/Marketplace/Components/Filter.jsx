'use client'
import ArrowUp from '@/app/Assets/Icons/ArrowUp';
import FilterIcon from '@/app/Assets/Icons/FilterIcon'
import React, {useState} from 'react'

function Filter() {
      const [price, setPrice] = useState(75);

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };
  return (
    <div className='pl-6'>
        <div className='flex items-center text-2xl font-medium'>
            <FilterIcon /> Filter
        </div>
        <div className='bg-[#AFB091] rounded-md w-[200px] h-1'></div>
        <div className='mt-6 flex flex-col gap-1'>
            <h3 className='flex items-center text-2xl font-medium gap-4'>By Category <span><ArrowUp /></span></h3>
            <div className='flex items-center gap-1'> <input type="checkbox" className='bg-[#d9d9d9]' name="Filter" /> Editorials</div>
            <div className='flex items-center gap-1'> <input type="checkbox" name="Filter" /> Fashion</div>
            <div className='flex items-center gap-1'> <input type="checkbox" name="Filter" /> Optics</div>
            <div className='flex items-center gap-1'> <input type="checkbox" name="Filter" /> Art & Museum</div>
            <div className='flex items-center gap-1'> <input type="checkbox" name="Filter" /> Nature</div>
        </div>
        
        <div className='mt-6'>
            <h3 className='flex items-center text-2xl font-medium gap-4'>By Price <span><ArrowUp /></span></h3>
            <div className='flex flex-col-reverse'>
                <input
                    type="range"
                    min="0"
                    max="150"
                    value={price}
                    onChange={handlePriceChange}
                    className="bg-[#b8bcb5] text-black border-none"
                    id="priceRange"
                />
                <output htmlFor="priceRange" id="priceOutput" className='my-3'>
                    By ${price} - $150
                </output>
            </div>

        </div>
        
        <div className='mt-6'>
            <h3 className='flex items-center text-2xl font-medium gap-4'>By Artist <span><ArrowUp /></span></h3>
            <h2 className='underline'>All</h2>
            <p>{`Below $100.00`}</p>
            <p>{`$100.00 - $150.00`}</p>
            <p>{`$150.00 - $200.00`}</p>
            <p>{`Above $200.00`}</p>
        </div>
    </div>
  )
}

export default Filter;