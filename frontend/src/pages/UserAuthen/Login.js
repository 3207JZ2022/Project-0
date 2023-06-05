import './Login.css';
import {useNavigate} from 'react-router-dom'
import Header from '../../components/header/Header.js';
import React, { useState, useEffect, useRef} from 'react';
function Login(){
    const formRef=useRef();

    const navigate = useNavigate();

    // check login state
    useEffect(()=>{
        fetch("http://localhost:8000/isAuthenticate", {
            method:"POST",
            mode:"cors",
            cache:"no-cache",
            credentials: "include", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                frontendAddress: 'http://localhost:3000/'
            })
        })
        .then(response => response.json())
        .then(data=>{
            if(data.loginState===true){
                navigate('/');
            }
        })
    })


    function goRegister(){
        navigate('/register');
    }
    const [disabled, setDisabled] = useState(false);
    const [loginResult, setResult] = useState("");
    function handleMesseage(result, milliseconds) {
        setResult(result);
        setTimeout(()=>{
            setResult("");
        } ,milliseconds)
    }

    const formSubmit =(e) =>{
        e.preventDefault();
        setDisabled(true);
        setTimeout(() => {
          setDisabled(false);
        }, 4000);

        fetch('http://localhost:8000/login', {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json, text/javascript, image/jpg'
            },
            body: JSON.stringify({
                email: formRef.current.email.value.toLowerCase(),
                password: formRef.current.password.value
            })
        }).then(async (res) => {
            if(res.status===401){
                handleMesseage("Password Mismatch",4000)
            }else{
                formRef.current.submit();
            }

        }).catch(err => {
            console.log(err.message);
        });
    }
    
    return(
        <div className='login-container'>
            <Header />
            {loginResult? 
            <h5 className='login-result' style={{whiteSpace: "pre-line"}}>{loginResult}</h5>
            :""}
            <div className="form-container">
                <h1 className='form-title'>Sign In</h1>
                <form className='login-form' ref={formRef} autoComplete="off " 
                    onSubmit={formSubmit}
                    method='POST' action="http://localhost:8000/login">
                    <ul className='form-input-list'>
                        <li>
                            <input className='form-input' name="email" placeholder="Email / Username" />
                        </li>
                        <li>
                            <input className='form-input' type='password' name="password" placeholder="Password" required minLength={8} maxLength={16}/>
                        </li>
                    </ul>
                    <div className="form-btn-container">
                        <button className='redirect' type='button' onClick={goRegister}>Sign Up</button>
                        <button className='submit' type="submit" disabled={disabled}>Sign In</button>
                    </div>
                </form>
            </div>
    </div>)
}

export default Login;