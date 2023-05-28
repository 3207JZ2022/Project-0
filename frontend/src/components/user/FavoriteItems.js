import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import "./FavoriteItems.css"

export default function FavoriteItems({likedItems}) {

  const navigate=useNavigate();
  function handleClick(e) {
    navigate('/products?id='+ e.currentTarget.getAttribute('itemID'));
  }

  return (
    <ul className="favorite-items-container">
        {likedItems.map((favoriteItem,index) => 
          <li className="favorite-item"  key={index} itemID={favoriteItem.id} onClick={handleClick}>
              <div className="favorite-img-title">
                  <h2 >{favoriteItem.title}</h2>
              </div>
              <img className="favorite-img" src={"http://localhost:8000/profileLikedImgs/" + favoriteItem.src}></img>
          </li>)}
    </ul>
  )
}
