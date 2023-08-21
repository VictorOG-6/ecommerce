import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import imageUrlBuilder from '@sanity/image-url';
import { createClient } from 'next-sanity';
import clientConfig from '../../sanity/lib/client-config';

const Product = ({ product }) => {
 
  return (
    <div>
      <Link href={`/product/${product.slug}`}>
        <div className="product-card">
            <Image
              src={product.image[0].url}
              alt={product.name}
              width={250}
              height={250}
              className="product-image"
            />
          <p className="product-name">{product.name}</p>
          <p className="product-price">${product.price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Product
