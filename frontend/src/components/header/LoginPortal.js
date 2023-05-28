import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LoginPortal.css';
export default function LoginPortal() {

    const[loginState, setLoginState] = useState(false);
    useEffect(()=>{
        fetch("http://localhost:8000/isAuthenticate", {
            method:"POST",
            mode:"cors",
            cache:"no-cache",
            credentials: "include", 
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(response => response.json())
        .then(data=>{
            setLoginState(data.loginState);
        })
    },[])

    function logOut(e){
        e.preventDefault();
        fetch("http://localhost:8000/logout", {
            method:"POST",
            mode:"cors",
            cache:"no-cache",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(response =>{
            window.location.reload(true);
        } )
    }

    return (
        <div className='login-portal-container'>
                { loginState? <a  onClick={logOut} >Log Out</a> 
            :<Link to='/Login' relative="path">Log In</Link>}
        </div>
    )
}
