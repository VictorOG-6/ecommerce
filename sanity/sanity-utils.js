import { createClient } from "next-sanity";
import groq from 'groq';
import clientConfig from "./lib/client-config"

export async function getProducts(){
    return createClient(clientConfig).fetch(
        groq`*[_type == 'product']{
            _id,
            _createdAt,
            "image": image[] {
                'url':asset->url
                },
            name,
            'slug': slug.current,
            price,
            details
        }`
    )
}

export async function getProduct(slug){
    return createClient(clientConfig).fetch(
        groq`*[_type == 'product' && slug.current == $slug][0]{
            _id,
            _createdAt,
            "image": image[] {
                'url':asset->url
                },
            name,
            'slug': slug.current,
            price,
            details
        }`,
        { slug }
    )    
}

export async function getBanners(){
    return createClient(clientConfig).fetch(
        groq`*[_type == 'banner']{
            _id,
            _createdAt,
            'image': image.asset->url,
            buttonText,
            product,
            desc,
            smallText,
            midText,
            largeText1,
            largeText2,
            discount,
            saleTime
        }`
    )
}