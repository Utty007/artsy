'use client'
import React, { useRef, useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getDatabase, ref as dbRef, update, get, child } from 'firebase/database';
import { app } from '@/app/Auth/firebase';

function Merch() {
  const pNameRef = useRef();
  const priceRef = useRef();
  const descRef = useRef();
  const imgRef = useRef();

  const [showCreateProduct, setShowCP] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState(null)
  const [generalMessage, setGeneralMessage] = useState()

  const handleShowCP = () => {
    setShowCP(!showCreateProduct);
  };

  const handleFormSubmission = async (event) => {
    event.preventDefault();
    setIsLoading(true)
    const storage = getStorage(app);
    const db = getDatabase(app);

    const productImage = imgRef.current.files[0];
    const storageRef = ref(storage, `products/${productImage.name}`);
    try {
      await uploadBytes(storageRef, productImage);
      const downloadURL = await getDownloadURL(storageRef);

      const productData = {
        name: pNameRef.current.value,
        price: parseFloat(priceRef.current.value),
        description: descRef.current.value,
        img: downloadURL,
        id: 'vaultsofsecret'
      };

      const dbRefProducts = dbRef(db, 'Products/Products');
      const snapshot = await get(dbRefProducts);

      if (snapshot.exists()) {
        const products = snapshot.val();
        const newIndex = Object.keys(products).length + 1;
        await update(dbRef(db, `Products/Products/${newIndex}`), productData);
      } else {
        await update(dbRef(db, 'Products/Products/0'), productData);
      }

      console.log('Product uploaded successfully', productData);
      setIsLoading(false)
      setStatus('success')
      setGeneralMessage('Product uploaded successfully!')
      pNameRef.current.value = ''
      priceRef.current.value = ''
      descRef.current.value = ''
      imgRef.current.value = ''
    } catch (error) {
      console.error('Error uploading product:', error);
      setIsLoading(false)
      setStatus('error')
      setGeneralMessage('Product failed to upload.')
    }
  };

  return (
    <div className='px-8'>
      <h3 className='text-xl font-medium text-center mt-12'>Welcome To Your Store!</h3>
      <h2 className='my-4 text-center text-lg'>PRODUCTS</h2>
      <div>
        <p className='text-center'>You Currently Do Not Have Any Product.</p>
        <div className='flex justify-center my-3'>
          <button onClick={handleShowCP} className='bg-black text-white rounded-md p-2 capitalize'>
            {showCreateProduct? 'Hide Add To Product Form' : 'Click here to add a Product'}
          </button>
        </div>
      </div>

      {showCreateProduct && (
        <form onSubmit={handleFormSubmission} className='bg-black rounded-md p-4 max-w-[600px] m-auto mt-8 mb-16'>
          <div className='flex flex-col md:flex-row justify-between gap-2 md:gap-16 mb-3'>
            <div className='flex w-full md:w-auto flex-col gap-1'>
              <label htmlFor='productName' className='text-white'>
                Product Name
              </label>
              <input required className='rounded-md min-w-[200px] w-full outline-none p-2' type='text' name='productName' ref={pNameRef} />
            </div>
            <div className='flex w-full md:w-auto flex-col gap-1'>
              <label htmlFor='price' className='text-white'>
                Price (In Naira)
              </label>
              <input required className='rounded-md min-w-[200px] w-full outline-none p-2' ref={priceRef} type='text' name='price' />
            </div>
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor='description' className='text-white'>
              Description
            </label>
            <textarea className='rounded-md outline-none p-2' ref={descRef} required name='description' rows={10} cols={30}></textarea>
          </div>
          <div className='text-white my-4'>
            <label htmlFor='image'> Choose an Image</label> <input required ref={imgRef} type='file' name='image' />
          </div>
          <div className='flex justify-center'>
            <button type='submit' className='bg-white text-[16px] text-black px-7 py-2 rounded-md'>
              {isLoading? <span className="loading loading-spinner loading-lg"></span> : 'Submit'}
            </button>
          </div>
        </form>
      )}

      {generalMessage && <div role="alert" className={`alert alert-${status} absolute bottom-5 right-5 w-[400px] text-white shadow-lg`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>{generalMessage}</span>
      </div>}
    </div>
  );
}

export default Merch;
