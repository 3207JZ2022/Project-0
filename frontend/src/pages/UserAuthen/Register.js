import './Register.css';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import {useRef, useState} from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
function Register(){
    function handleRegisterMesseage(result, milliseconds) {
        setResult(result);
        setTimeout(()=>{
            setResult("");
        } ,milliseconds)
    }

    const [disabled, setDisabled] = useState(false);
    const [registerResult, setResult] = useState("");

    const navigate=useNavigate();
    const formRef=useRef();

    const formSubmit =(e) =>{
        e.preventDefault();
        setDisabled(true);
        setTimeout(() => {
          setDisabled(false);
        }, 4000);
        const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{"':;?/>.<,])(?!.*\s).{8,16}$/;
        if(formRef.current.password.value!==formRef.current.cpassword.value){
            handleRegisterMesseage("Password Mismatch",4000)
        }
        else if(passw.test(formRef.current.password.value)){
                    fetch('http://localhost:8000/register',{
                    method:"POST",
                    mode:"cors",
                    cache:"no-cache",
                    redirect:'follow',
                    headers: {      
                        'Content-Type':'application/json',
                        'Accept':'application/json, text/javascript, image/jpg'
                },
                body:JSON.stringify({
                    email: formRef.current.email.value.toLowerCase(),
                    displayName: formRef.current.displayName.value,
                    fName: formRef.current.fName.value,
                    lName: formRef.current.lName.value,
                    password: formRef.current.password.value
                })
            }).then(async (res)=>{
                if (res.redirected) {
                    window.location.replace(res.url); 
                }
                return res.json();

            }).then((js)=>{
                if(js.handle){
                    handleRegisterMesseage(js.handle, 4000);
                }
            })
        }else{
            handleRegisterMesseage("Password must have \n"+ 
            "8 to 16 characters,\n"+
            "1 lowercase letters,\n"+
            "1 uppercase letters,\n"+
            "1 numbers & symbols.",4000);
        }
    }

    function goLogin(){
        navigate('/login');
    }

    const pwdRef= useRef();
    const cpwdRef= useRef();
    const [active, setActive] = useState(true);

    function handleClick(ref){
        setActive(!active);
        if(ref.current.type=="password") ref.current.type="text";
        else ref.current.type="password";
    }
    

    return (
        <div className='register-container'>
            <Header />
            {registerResult? 
            <h5 className='register-result' style={{whiteSpace: "pre-line"}}>{registerResult}</h5>
            :""}
            <div className='form-container'>
                <h1 className='form-title'>Get <div className='split-line'></div> Started</h1>
                <form className='register-form' autoComplete="off" ref={formRef} onSubmit={formSubmit}
                    method="post" action='http://localhost:8000/register/'>
                    <ul className='form-input-list'>
                        <li>
                            <input className='form-input' type='text' name="fName" placeholder="First Name" maxLength="30" required/>
                        </li>
                        <li>
                            <input className='form-input' type='text' name="lName" placeholder="Last Name" maxLength="30" required/>
                        </li>
                        <li>
                            <input className='form-input' type='text' name="displayName" placeholder="Display Name" maxLength="18" required/>
                        </li>
                        <li> 
                            <input className='form-input' type='email' name="email" placeholder="Email / Username" maxLength="22" required/>
                        </li>
                        <li>
                            <div className="show-pwd" onClick={()=>{handleClick(pwdRef)}}>
                                <VisibilityOffIcon className={"show-pwd " + active}/>
                                <VisibilityIcon className={"show-pwd " + !active}/>
                            </div>
                            <input className='form-input' type='password' name="password" placeholder="Enter Password" ref={pwdRef} maxLength="22" />
                        </li>
                        <li>
                            <input className='form-input' type='password' name="cpassword" placeholder="Confirm Password" ref={cpwdRef} maxLength="22"/>
                        </li>
                    </ul>
                    <div className="form-btn-container">
                        <button className='redirect' type='button' onClick={goLogin}>Sign In Instead</button>
                        <button className='submit' type="submit" disabled={disabled}>Register</button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Register;

