import React from 'react'
import SubHeader from './Components/SubHeader'
import ProductsList from './Components/ProductsList'
import Filter from './Components/Filter';
import Footer from '../Components/Footer';

function page() {
  return (
    <div className='px-6 md:px-12'>
      <h3 className='py-5 font-medium pt-5 pb-6'><span className='font-light'>Home/</span> Marketplace</h3>
      <SubHeader />
      <div className='flex gap-24 mt-9 justify-between'>
        <Filter /> 
        <ProductsList />
      </div>
      <Footer />
    </div>
  )
}

export default page;