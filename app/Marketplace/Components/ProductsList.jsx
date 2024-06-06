'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/app/Store/CartStore';
import { getDatabase, ref, get } from 'firebase/database';

const ProductsList = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [products, setProducts] = useState(null)

    const fetchProducts = async () => {
        try {
            const db = getDatabase();
            const productRef = ref(db, `Products/`);

            // Fetch the data at the user-cart reference
            const dataSnapshot = await get(productRef);
            // Check if the data exists
            if (dataSnapshot.exists()) {
              // Data exists, retrieve the data
              const userData = dataSnapshot.val();
              console.log(userData.Products)
              setProducts(userData.Products)
              setIsLoading(false)
            } else {
              // Data doesn't exist
              setIsLoading(false)
              console.log("Products do not exist.")
            }
          } catch (error) {
            setIsLoading(false)
            console.error("Error fetching user data:", error);
            return null;
          }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const sortOrder = useCartStore(state => state.sortOrder) 
    const [spliceNum, setSpliceNum] = useState(6)
    const [SMV, setSMV] = useState(true)
    const seeMore = () => { 
        setSpliceNum(9);
        setSMV(false)
    }

    const sortedProducts = products?.sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.name.localeCompare(b.name);``
        } else if (sortOrder === 'desc') {
            return b.name.localeCompare(a.name);
        } else {
            return 0; // Default, no sorting
        }
    })

  return (
    <div className='md:max-w-[925px] w-full md:px-6'>
        {isLoading ? <>
          <div className='loading loading-spinner loading-lg m-auto block'></div>
        </> : <>
            <div className='flex flex-col w-full md:w-auto md:flex-row items-center justify-evenly flex-wrap '>
                {sortedProducts.map((items, index)=> {
                return <Link href={`/Marketplace/${items.id}`} key={index} className='bg-white w-full md:w-[250px] shadow-md p-2 rounded-md mb-6'>
                    <div>
                        <Image src={items.img} width={300} height={300} className='w-full' alt='Product Image' />
                    </div>
                    <div className='flex items-center justify-between md:block'>
                        <h3 className='text-xl my-2'>{items.name}</h3>
                        <h3 className='text-2xl font-bold'>₦{items.price}</h3>
                    </div>
                </Link>
            })}
            </div>
            {/* {SMV && <button onClick={()=> {seeMore()}} className='border border-black p-2 rounded-md flex justify-center my-5 mx-auto'>See More</button>} */}
        </>}
    </div>
  )
}

export default ProductsList;

