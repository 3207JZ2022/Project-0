import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import "./FavoriteItems.css"

export default function FavoriteItems(props) {

  const navigate=useNavigate();
  function handleClick(e) {
    
    navigate('/products?releasedID='+ e.currentTarget.getAttribute('itemID'));
  }
  const [items, setItems] = useState([0]);
  // find liked items
  useEffect(()=>{

    if(props.username){
        fetch("http://localhost:8000/profile/"+props.username,{
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          credentials: "include", 
          headers: { 
              'Content-Type': 'application/json',
              'Accept': 'application/json, text/javascript, image/jpg'
          }
      })
      .then((response)=>{
          return response.json();
      })
      .then((result)=>{
          if(result.data){
              setItems(result.data);
          }
      })
      .catch((err)=>{console.log(err)});
      }
  },[props.username])



  return (
    <ul className="favorite-items-container">
        {items[0]? items.map((favoriteItem,index) => 
          <li className="favorite-item"  key={index} itemID={favoriteItem.releasedId} onClick={handleClick}>
              <div className="favorite-img-title">
                  <h2 >{favoriteItem.title? favoriteItem.title:"No Title"}</h2>
              </div>
              <img className="favorite-img" src={"http://localhost:8000/imgs/" + favoriteItem.src}></img>
          </li>)
          :""}
    </ul>
  )
}
