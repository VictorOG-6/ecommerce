"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getProduct, getProducts } from '@/sanity/sanity-utils';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { Product } from '@/app/components';
import { useStateContext } from '@/app/context/StateContext';

export default function ProductDetails({ params }) {
  const { slug } = params;
  const [products, setProducts] = useState([]);
  const [productData, setProductData] = useState({});
  const [index, setIndex] = useState(0)
  const {decQty, incQty, qty, onAdd, setShowCart} = useStateContext()

  const handleBuyNow = () => {
    onAdd(productData, qty)
    setShowCart(true)
  }

  useEffect(() => {
    const fetchProducts = async () => {
      const productList = await getProducts();
      setProducts(productList);
    };

    const fetchProductData = async () => {
      const data = await getProduct(slug);
      setProductData(data);
    };

    fetchProducts();
    fetchProductData();
  }, [slug]);

  const { image, name, details, price } = productData;
  

  return (
    <div>
      <div className='product-detail-container'>
        <div>
          <div className='image-container'>
            <Image src={image ? image[index].url : '/placeholder.jpg'} alt={name} height={450} width={450} className='product-detail-image' />
          </div>
          <div className='small-images-container'>
            {image?.map((item, i) =>  (
              <Image src={item.url} alt='headphones' key={i} height={450} width={450} className={i == index ? 'small-image selected-image' : 'small-image'} onMouseEnter={() => setIndex(i)}/>
            ))}
          </div>
        </div>
        <div className='product-detail-desc'>
          <h1>{name}</h1>
          <div className='reviews'>
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details:</h4>
          <p>{details}</p>
          <p className='price'>${price}</p>
          <div className='quantity'>
            <h3>Quantity</h3>
            <p className='quantity-desc'>
              <span className='minus' onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className='num'>
                {qty}
              </span>
              <span className='plus' onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className='buttons'>
            <button type='button' className='add-to-cart' onClick={() => onAdd(productData, qty)}>
              Add to Cart
            </button>
            <button type='button' className='buy-now' onClick={ handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className='maylike-products-wrapper'>
        <h2>You may also like</h2>
        <div className='marquee'>
          <div className='maylike-products-container track'>
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
