import React, {useState}from 'react'
import './Product.css'

export default function Product({title,src=[],description}) {
  const [img, setImg]= useState(src[0]);

  function handleImgClick(e){
    setImg(e.target.src)
  }


  return (
    <div className="product-container">

        <h1 className="product-title">{title}</h1>

        <div className="product-box"> 
            <div className="left-col">
                  <ul className="product-thumbs-list">
                      {src.map( (x,index)=>{
                        return <li className='products-thumbs-item' key={index}> <img className='products-thumbs' src={x} onClick={handleImgClick}/></li>
                      })
                      }
                  </ul>
                  <img className="selected-thumb" src={img?img:src[0]} alt={title} ></img>
            </div>
            <div className="right-col">
              <div className="product-text">
                <p>{description}</p>
              </div>
            </div>
        </div>
    </div>
  )
}
