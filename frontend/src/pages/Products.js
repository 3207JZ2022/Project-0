import React, {useEffect, useState} from 'react'
import {useNavigate ,useSearchParams} from 'react-router-dom';
import Header from '../components/header/Header'
import Product from '../components/product-page/Product'
import LikeBtn from '../components/product-page/LikeBtn.js';
import NotFound from './NotFound.js'

import './Products.css'

export default function Products() {
    const [params] = useSearchParams();
    const releasedID=params.get('releasedID');
    const navigate = useNavigate();

    // load page
    const[productData, setProductData] = useState({})
    const[productImgs, setProductImgs] = useState([]);

    // obtain product information
    useEffect(()=>{
        fetch("http://localhost:8000/product/" + releasedID )
        .then(response => response.json())
        .then(data=>{
            let temp=data.map((x, index)=>{
                if(!x.title.trim()){
                    x.title="No Title";
                }
                return {
                    title:x.title,
                    description:x.descrip,
                    author:x.author,
                    releasedID: x.releasedID
                }
            })
            setProductData(temp);
        })
    }, []
    );

    //obtain product images
    useEffect(()=>{
        fetch("http://localhost:8000/productthumbs/" + releasedID )
        .then(response => response.json())
        .then(data=>{
            if(data[0]){
                let temp=[];
                data.map((x,index)=>{
                    temp.push("http://localhost:8000/productthumblist/" +x.src)
                })
                setProductImgs(temp);
            }
        })
    }, []
    );





    return (
      <div className='products-page' >
        <Header />

        <div className='products-body'>
        {productData[0]&&productImgs[0]? <Product productdata={productData} productImgs={productImgs}/>: <NotFound />}
        </div>

        {productData[0]? 
        <LikeBtn releasedID={releasedID}  />
        :<p></p>
        }
      </div>
    )
}
