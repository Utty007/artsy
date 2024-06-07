'use client'
import React, { useEffect, useRef, useState } from 'react';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getDatabase, ref as dbRef, update, get, child, runTransaction } from 'firebase/database';
import { app } from '@/app/Auth/firebase';
import { getAuth } from 'firebase/auth';
import Image from 'next/image';

const Merch = (props) => {
  const pNameRef = useRef();
  const priceRef = useRef();
  const descRef = useRef();
  const imgRef = useRef();
  const idRef = useRef();
  const categoryRef = useRef();

  const [showCreateProduct, setShowCP] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [generalMessage, setGeneralMessage] = useState();
  const [errors, setErrors] = useState({});
  const [userMerchantProducts, setUserMerchantProducts] = useState([]);
  const auth = getAuth(app);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchMerchantProducts = async () => {
      if (user) {
        const db = getDatabase(app);
        const userId = user.uid;
        const userMerchantProductsRef = dbRef(db, `users/merchant/${userId}/products`);
        
        try {
          const snapshot = await get(userMerchantProductsRef);
          if (snapshot.exists()) {
            const productsData = snapshot.val();
            setUserMerchantProducts(Object.values(productsData));
          } else {
            setUserMerchantProducts([]);
          }
        } catch (error) {
          console.error('Error fetching merchant products:', error);
        }
      }
    };

    fetchMerchantProducts();
  }, [user]);

  const handleShowCP = () => {
    setShowCP(!showCreateProduct);
  };

  const validateFields = () => {
    const errors = {};
    if (!pNameRef.current.value) {
      errors.productName = 'Product name is required';
    }
    if (!priceRef.current.value) {
      errors.price = 'Price is required';
    }
    if (!descRef.current.value) {
      errors.description = 'Description is required';
    }
    if (!idRef.current.value) {
      errors.productId = 'Product ID is required';
    } else if (/\s/.test(idRef.current.value)) {
      errors.productId = 'Product ID cannot contain whitespace';
    }
    if (!imgRef.current.files.length) {
      errors.image = 'Image is required';
    } else if (!imgRef.current.files[0].type.startsWith('image/')) {
      errors.image = 'Only image files are allowed';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmission = async (event) => {
    event.preventDefault();
    if (!validateFields()) {
      return;
    }
    setIsLoading(true);
    const storage = getStorage(app);
    const db = getDatabase(app);

    const productImage = imgRef.current.files[0];
    const storeRef = storageRef(storage, `products/${productImage.name}`);
    
    try {
      await uploadBytes(storeRef, productImage);
      const downloadURL = await getDownloadURL(storeRef);

      const productData = {
        name: pNameRef.current.value,
        price: parseFloat(priceRef.current.value),
        description: descRef.current.value,
        img: downloadURL,
        id: idRef.current.value,
        category: categoryRef.current.value,
        creatorName: props.creatorName
      };

      // Add product to Products/Products node
      const dbRefProducts = dbRef(db, 'Products/Products');
      const snapshot = await get(dbRefProducts);

      let newProductIndex;
      if (snapshot.exists()) {
        const products = snapshot.val();
        newProductIndex = Object.keys(products).length;
        await update(dbRef(db, `Products/Products/${newProductIndex}`), productData);
      } else {
        newProductIndex = 0;
        await update(dbRef(db, 'Products/Products/0'), productData);
      }

      // Add product to user's merchant node
      if (user) {
        const userId = user.uid;
        const userMerchantProductsRef = dbRef(db, `users/merchant/${userId}/products`);

        await runTransaction(userMerchantProductsRef, (currentProducts) => {
          if (currentProducts) {
            currentProducts.push(productData);
          } else {
            currentProducts = [productData];
          }
          return currentProducts;
        });

        // Retrieve and log the updated products array
        const updatedProductsSnapshot = await get(userMerchantProductsRef);
        if (updatedProductsSnapshot.exists()) {
          const updatedProducts = updatedProductsSnapshot.val();
          setUserMerchantProducts(Object.values(updatedProducts));
        } else {
          console.log('No products found for merchant');
        }
      }

      setIsLoading(false);
      setStatus('success');
      setGeneralMessage('Product uploaded successfully!');
      setTimeout(() => {
        setGeneralMessage(null)
      }, 5000)
      pNameRef.current.value = '';
      priceRef.current.value = '';
      descRef.current.value = '';
      imgRef.current.value = '';
      idRef.current.value = '';
    } catch (error) {
      console.error('Error uploading product:', error);
      setIsLoading(false);
      setStatus('error');
      setGeneralMessage('Product failed to upload.');
      setTimeout(() => {
        setGeneralMessage(null)
      }, 5000)
    }
  };

  return (
    <div className='px-8'>
      <h3 className='text-xl font-medium text-center mt-12'>Welcome To Your Store!</h3>
      <h2 className='my-4 text-center text-lg'>PRODUCTS</h2>
      <div>
        {isLoading ? (
          <p className='text-center'>Loading...</p>
        ) : userMerchantProducts.length === 0 ? (
          <p className='text-center'>You Currently Do Not Have Any Product.</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {userMerchantProducts.map((product) => (
              <div key={product.id} className='border p-4'>
                <Image unoptimized={true} src={product.img} alt={product.name} width={300} height={300} className='w-full mb-2' />
                <p className='text-lg font-medium'>{product.name}</p>
                <p className='text-sm text-gray-500 mb-2'>{product.description}</p>
                <p className='text-lg font-bold'>₦{product.price}</p>
              </div>
            ))}
          </div>
        )}
        <div className='flex justify-center my-3'>
          <button onClick={handleShowCP} className='bg-black text-white rounded-md p-2 capitalize'>
            {showCreateProduct ? 'Hide Add To Product Form' : 'Click here to add a Product'}
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
              <input className='rounded-md min-w-[200px] md:min-w-[250px] w-full outline-none p-2' type='text' name='productName' ref={pNameRef} />
              {errors.productName && <span className='text-red-500'>{errors.productName}</span>}
            </div>
            <div className='flex w-full md:w-auto flex-col gap-1'>
              <label htmlFor='price' className='text-white'>
                Price (In Naira)
              </label>
              <input className='rounded-md min-w-[200px] md:min-w-[250px] w-full outline-none p-2' ref={priceRef} type='text' name='price' />
              {errors.price && <span className='text-red-500'>{errors.price}</span>}
            </div>
          </div>
          <div className='flex flex-col md:flex-row justify-between gap-2 md:gap-16 mb-3'>
            <div className='flex w-full md:w-auto flex-col gap-1'>
              <label htmlFor='productId' className='text-white'>
                Product Id
              </label>
              <input className='rounded-md min-w-[200px] md:min-w-[250px] w-full outline-none p-2' type='text' name='productId' ref={idRef} />
              {errors.productId && <span className='text-red-500'>{errors.productId}</span>}
            </div>
            <div className='flex w-full md:w-auto flex-col gap-1'>
              <label htmlFor='category' className='text-white'>
                Category
              </label>
              <select name="category" ref={categoryRef} className='outline-none min-w-[200px] md:min-w-[250px] p-2 rounded-md'>
                <option value="Art">Art</option>
                <option value="Book">Book</option>
                <option value="Fashion">Fashion</option>
              </select>
            </div>
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor='description' className='text-white'>
              Description
            </label>
            <textarea className='rounded-md outline-none p-2' ref={descRef} name='description' rows={10} cols={30}></textarea>
            {errors.description && <span className='text-red-500'>{errors.description}</span>}
          </div>
          <div className='text-white my-4'>
            <label htmlFor='image'> Choose an Image</label> 
            <input ref={imgRef} type='file' name='image' accept="image/*" />
            {errors.image && <span className='text-red-500'>{errors.image}</span>}
          </div>
          <div className='flex justify-center'>
            <button type='submit' className='bg-white text-[16px] text-black px-7 py-2 rounded-md'>
              {isLoading ? <span className="loading loading-spinner loading-lg"></span> : 'Submit'}
            </button>
          </div>
          {generalMessage && (
            <div role="alert" className={`alert alert-${status} fixed bottom-5 right-5 w-[400px] text-white shadow-lg`}>
              <span>{generalMessage}</span>
            </div>
          )}
        </form>
      )}
    </div>
  );
}

export default Merch;
