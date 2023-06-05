import React from 'react'
import {useState, useEffect, useRef} from 'react';
import { useNavigate} from 'react-router';
import './UserInfo.css'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function UserInfo() {
    const [username, setUsername]= useState(null);
    const navigate = useNavigate();
    const emailRef=useRef();
    const passwordRef=useRef();

    //a flow window to display messeage
    const [formResult, setResult] = useState("");
    function handleMesseage(result, milliseconds) {
        setResult(result);
        setTimeout(()=>{
            setResult("");
        } ,milliseconds)
    }

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

    // disable button for 4s after submitting daata
    const [disabled, setDisabled] = useState(false);

    const updatePassword =(e) =>{
        e.preventDefault();
        setDisabled(true);
        setTimeout(() => {
          setDisabled(false);
        }, 4000);

        const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{"':;?/>.<,])(?!.*\s).{8,16}$/;
        if(passwordRef.current.newPassword.value!==passwordRef.current.confirmPassword.value){
            handleMesseage("Confirm Password Mismatch",4000)

        }else if(passwordRef.current.oldPassword.value===passwordRef.current.newPassword.value){
            handleMesseage("New Password Must Differ",4000)
        }else if(!passw.test(passwordRef.current.newPassword.value)){
            handleMesseage("Password must have \n"+ 
            "8 to 16 characters,\n"+
            "1 lowercase letters,\n"+
            "1 uppercase letters,\n"+
            "1 numbers & symbols.",4000)
        }else{
            fetch('http://localhost:8000/updateUserPassword', {
                method: "PATCH",
                mode: "cors",
                cache: "no-cache",
                credentials: "include", 
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json, text/javascript, image/jpg'
                },
                body: JSON.stringify({
                    oldPassword: passwordRef.current.oldPassword.value,
                    newPassword: passwordRef.current.newPassword.value
                })
            }).then((res) => {
                return res.json();
            }).then((js)=>{
                if(js.handle){
                    handleMesseage(js.handle,4000)
                }else{
                // the session will be logged out from the server, refresh the page    
                    window.location.reload(true);
                }
            })
            .catch(err => {
                console.log(err.message);
            });
        }
    }

    const updateEmail =(e) =>{
        e.preventDefault();
        setDisabled(true);
        setTimeout(() => {
          setDisabled(false);
        }, 4000);
        function validateEmail(email) {
            var reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ 
            return reg.test(email);
        }
        if(validateEmail(emailRef.current.newEmail.value)){
            fetch('http://localhost:8000/updateUserEmail', {
                method: "PATCH",
                mode: "cors",
                cache: "no-cache",
                credentials: "include", 
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json, text/javascript, image/jpg'
                },
                body: JSON.stringify({
                    newEmail: emailRef.current.newEmail.value.toLowerCase()
                })
            })
            .then((res) => {return res.json();})
            .then((js)=>{
                if(js.handle){
                    // give error messeage
                    handleMesseage(js.handle,4000)
                }else{
                    // the session will be logged out from the server, refresh the page    
                    window.location.reload(true);
                }
            }).catch(err => {
                console.log(err.message);
            });
        }else{
            handleMesseage("Invalid E-Mail Address",4000)
        }
    }

    const pwdRef= useRef();
    const [active, setActive] = useState(true);

    function handleClick(ref){
        setActive(!active);
        if(ref.current.type=="password") ref.current.type="text";
        else ref.current.type="password";
    }
    
 
  return (
<div className='user-info-container'>
        {formResult? 
        <h5 className='change-profile-result' style={{whiteSpace: "pre-line"}}>{formResult}</h5>
        :""}

        <ul className='user-info-list'>
            <li className='user-info-item'>        
                <h1 className='user-info-title'>E-mail: {username}</h1>
                    <form className='change-profile-form' ref={emailRef} autoComplete="off " 
                        onSubmit={updateEmail}
                        method='PATCH' action="http://localhost:8000/changepassword">
                        <ul className='user-form-input-list'>
                            <li>
                                <input className='user-form-input' name="newEmail" placeholder="Enter New E-mail" />
                            </li>
                        </ul>
                        <button className='change-btn' type="submit" disabled={disabled}>Change</button>
                    </form>
            </li>

            <li className='user-info-item'>
                <h1 className='user-info-title'>Change Password</h1>
                <form className='change-profile-form' ref={passwordRef} autoComplete="off " 
                    onSubmit={updatePassword}
                    method='POST' action="http://localhost:8000/changepassword">
                    <ul className='user-form-input-list'>
                        <li>
                            <input className='user-form-input' type='password' name="oldPassword" placeholder="Enter Old Password" 
                                required maxLength="16"/>
                        </li>
                        <li className="show-pwd-container">
                            <div className="profile-show-pwd" onClick={()=>{handleClick(pwdRef)}}>
                                <VisibilityOffIcon className={"profile-show-pwd " + active}/>
                                <VisibilityIcon className={"profile-show-pwd " + !active}/>
                            </div>
                            <input className='user-form-input' type='password' name="newPassword" placeholder="Enter New Password" 
                                ref={pwdRef} required minLength={8} maxLength={16}/>
                        </li>
                        <li>
                            <input className='user-form-input' type='password' name="confirmPassword" placeholder="Confirm New Password" 
                                required minLength={8} maxLength={16}/>
                        </li>
                    </ul>
                    <button className='change-btn' type="submit" disabled={disabled}>Change</button>
                </form>
            </li>
        </ul>


</div>
  )
}
