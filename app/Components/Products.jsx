import React from 'react';
import productOne from '@/app/Assets/ProductOne.png';
import productTwo from '@/app/Assets/ProductTwo.png';
import productThree from '@/app/Assets/ProductThree.png';
import ProductItem from './ProductItem';
import imgOne from '@/app/Assets/imgOne.png';
import imgTwo from '@/app/Assets/imgTwo.png'
import imgThree from '@/app/Assets/imgThree.png'

function Products() {
    const productData = [{
        name: "Boolean Egyptian", image: productOne, mImage: imgOne
    }, {
        name: "Are We There Yet", image: productTwo, mImage: imgTwo
        }, {
        name: "Oloibiri 1997", image: productThree, mImage: imgThree
    }]
  return (
    <div className='mx-5 md:mx-14 mt-24'>
        <h1 className='text-[#333] md:text-5xl text-2xl leading-[64px] font-medium py-3'>Featured Products</h1>
        <hr />
      <ProductItem className='flex flex-col flex-wrap gap-5 lg:flex-row items-center justify-between p-8 border border-transparent border-t-black' name={productData[0].name} Image={productData[0].image} mImage={productData[0].mImage}/>
        <hr />
        <ProductItem className='flex flex-col flex-wrap gap-5 items-center lg:flex-row-reverse justify-between p-8 border border-transparent border-t-black' name={productData[1].name} Image={productData[1].image} mImage={productData[1].mImage}/>
        <hr />
        <ProductItem className='flex flex-col flex-wrap gap-5 lg:flex-row items-center justify-between p-8 border border-transparent border-t-black' name={productData[2].name} Image={productData[2].image} mImage={productData[2].mImage}/>
    </div>
  )
}

export default Products;