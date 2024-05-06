import React from 'react'
import SubHeader from './Components/SubHeader'
import ProductsList from './Components/ProductsList'
import Filter from './Components/Filter';

function page() {
  return (
    <div className='px-12 pt-12'>
      <SubHeader />
      <div className='flex gap-24 mt-9 justify-between'>
        <Filter /> 
        <ProductsList />
      </div>
    </div>
  )
}

export default page;