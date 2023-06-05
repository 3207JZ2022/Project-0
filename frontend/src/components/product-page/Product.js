import React, {useEffect, useState} from 'react'

import './Product.css'

export default function Product({productdata,productImgs=[]}) {
  const [img, setImg]= useState(productImgs[0]);

  function handleImgClick(e){
    setImg(e.target.src)
  }


  return (
    <div className="product-container">

        <h1 className="product-title">{productdata[0].title}</h1>

        <div className="product-box"> 
            <div className="left-col">
                  <ul className="product-thumbs-list">
                      {productImgs.map( (x,index)=>{
                        return <li className='products-thumbs-item' key={index}> <img className='products-thumbs' 
                        src={x} onClick={handleImgClick}/></li>
                      })
                      }
                  </ul>
                  <img className="selected-thumb" src={img? img:productImgs[0] } alt={productdata[0].title} ></img>
            </div>
            <div className="right-col">
              <div className="product-text">
                <p>{productdata[0].description}</p>
              </div>
            </div>
        </div>
    </div>
  )
}
