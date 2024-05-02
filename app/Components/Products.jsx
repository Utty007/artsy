import React from 'react';
import productOne from '@/app/Assets/ProductOne.png';
import productTwo from '@/app/Assets/ProductTwo.png';
import productThree from '@/app/Assets/ProductThree.png';
import ProductItem from './ProductItem';

function Products() {
    const productData = [{
        name: "Boolean Egyptian", image: productOne
    }, {
        name: "Are We There Yet", image: productTwo
        }, {
        name: "Oloibiri 1997", image: productThree
    }]
  return (
    <div className='mx-14 mt-24'>
        <h1 className='text-[#333] text-5xl leading-[64px] font-medium py-3'>Featured Products</h1>
        <hr />
        <ProductItem className='flex flex-col lg:flex-row items-center justify-between p-8 border border-transparent border-t-black' name={productData[0].name} Image={productData[0].image} />
        <hr />
        <ProductItem className='flex flex-col items-center lg:flex-row-reverse justify-between p-8 border border-transparent border-t-black' name={productData[1].name} Image={productData[1].image} />
        <hr />
        <ProductItem className='flex flex-col lg:flex-row items-center justify-between p-8 border border-transparent border-t-black' name={productData[2].name} Image={productData[2].image} />
    </div>
  )
}

export default Products;

