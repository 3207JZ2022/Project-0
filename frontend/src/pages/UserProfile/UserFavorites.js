import React from 'react'
import FavoriteItems from '../../components/user/FavoriteItems'
import {useState, useEffect} from 'react';
import { useNavigate} from 'react-router';
import './UserFavorites.css'
export default function UserFavorites() {
    const navigate = useNavigate();
    const [username, setUsername]= useState(null);
    const [items, setItems] = useState([0]);
    useEffect(()=>{
        fetch("http://localhost:8000/profile",{
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
            if(result.username){
              setUsername(result.username);
            }else{
              navigate('/login')  
            }
        })
        .catch((err)=>{console.log(err)});
    },[])
    // found liked items
    useEffect(()=>{
        if(username){
            fetch("http://localhost:8000/profile/"+username,{
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
    },[username])
  return (
    <div className="user-favorites-container">
        {items[0]? <FavoriteItems likedItems={items} /> : <h1></h1>}
    </div>
  )
}
