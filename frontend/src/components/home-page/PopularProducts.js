import React from 'react'
import { useNavigate } from "react-router-dom";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./PopularProducts.css"


export default function PopularProducts({productsData, ind}) {

    const navigate=useNavigate();
    function navToProduct(product){
        const releasedID =productsData[product].releasedID;
        navigate('/products?releasedID=' +releasedID )
    }
    

    return (
        <div className="popular-container">
            <div className="carousel-container">
                <h1 className="carousel-container-title">Popular</h1>
                <Carousel className='carousel-items' 
                    onClickItem={navToProduct} 
                    infiniteLoop='true' 
                    transitionTime='500'
                    selectedItem={ind}	>
                    {productsData.map( (x, index) => 
                        <div key={index }>
                            <img className="carousel-img" src={x.src} />
                            <p className="caption">{x.title}</p>
                        </div>
                    )}
                </Carousel>
            </div>
        </div>
    )
}
