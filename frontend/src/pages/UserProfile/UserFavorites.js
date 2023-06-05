import React from 'react'
import FavoriteItems from '../../components/user/FavoriteItems'
import {useState, useEffect} from 'react';
import { useNavigate} from 'react-router';
import './UserFavorites.css'
export default function UserFavorites() {
    const navigate = useNavigate();
    const [username, setUsername]= useState(null);

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
              setUsername("favorite/"+result.username);
            }else{
              navigate('/login')  
            }
        })
        .catch((err)=>{console.log(err)});
    },[])

  return (
    <div className="user-favorites-container">
        {username? <FavoriteItems username={username}  /> : <h1></h1>}
    </div>
  )
}
