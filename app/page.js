import React from 'react'
import { getProducts, getBanners } from '@/sanity/sanity-utils'
import { Product, FooterBanner, HeroBanner} from './components'
import { client } from '@/sanity/lib/client'
import { image }  from '@/sanity/lib/image'
import { projectId } from '@/sanity/env'

export default async function Home () {
  const products = await getProducts();
  const banners = await getBanners();
  return (
    <>
      <HeroBanner heroBanner = {banners[0]}/>

      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      
      <div className='products-container'>
        {products.map((product) => <Product key={product._id} product={product}/> )}
      </div>

      <FooterBanner footerBanner={banners[0]}/>
    </>
  )
}