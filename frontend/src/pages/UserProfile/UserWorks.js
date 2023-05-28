import React from 'react'
import FavoriteItems from '../../components/user/FavoriteItems'
import {useState, useEffect, useRef} from 'react';
import { useNavigate} from 'react-router';
import './UserFavorites.css'
import './UserWorks.css'

export default function UserWorks() {
    const navigate = useNavigate();
    const [username, setUsername]= useState(null);
    const [items, setItems] = useState([0]);
    const [formResult, setResult] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [text, setText] = useState("");
    const descriptionRef = useRef();
    function handleDescriptionChange(event) {
        setText(event.target.value);
      }

    function handleMesseage(formResult, milliseconds) {
        setResult(formResult);
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
    // find own works
    useEffect(()=>{
        if(username){
            fetch("http://localhost:8000/profile/userworks/"+username,{
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
              if(result.handle){
                handleMesseage(result.handle, 4000);
              }else{
                setItems(result.data);
              }

          })
          .catch((err)=>{console.log(err)});
          }
    },[username])


    const [file, setFile] = useState(null);
    function isImage(file) {
        const fileName = file.name.toString();
        const fileExt = fileName.split('.').pop();
        const imagesExtension = ['png', 'jpg', 'jpeg','PNG',"JPG","JPEG"];
        return (imagesExtension.includes(fileExt));
    }
    function isOversized(file){
        const fileSize = file.size;
        return fileSize <= (10*1024*1024);
    }

    const handleFileUpload = (event) => {
      setFile(event.target.files[0]);
      setDisabled(false);
    };
  
    const handleSubmit = (event) => {
        event.preventDefault();
        if(!isImage(file)){
            setFile(null);
            setDisabled(true);
            handleMesseage("The file extension must be .png, .jpg, or .jpeg", 4000);
        }else if(!isOversized(file)){
            setFile(null);
            setDisabled(true);
            handleMesseage("The file size is larger than 10MB", 4000);
        }else{
            const formData = new FormData();
            formData.append('file', file);
            formData.append('description', descriptionRef.current.value)
            fetch('http://localhost:8000/profile/works/upload', {
                method: 'POST',
                mode: "cors",
                cache: "no-cache",
                credentials: "include", 
                body: formData,
            })
            .then((response) =>{
                return response.json();
            } )
            .then((data) => {
                if(data.handle){
                    handleMesseage(data.handle, 4000);
                }else{
                    handleMesseage("File uploaded!", 4000);
                    window.location.reload(true);
                }
            })
            .catch((error) => console.error(error));
        }
    };

  return (
    <div className="user-works-container">
        {formResult? 
        <h5 className='submit-work-result' style={{whiteSpace: "pre-line"}}>{formResult}</h5>
        :""}
        <h4 className="work-header">Upload Your Works:</h4>
 
        <div className="upload-work-container">
            <div className="work-header">
            </div>
            
            <form className="upload-work-form" onSubmit={handleSubmit}>
                <input className='upload-btn' type="file" onChange={handleFileUpload} />
                <textarea className='file-description' placeholder='Add the description' maxLength="300"
                value={text} onChange={handleDescriptionChange} ref={descriptionRef}
                 />
                <p className='description-limit'>Length: {text.length + "/300"}</p>
                <button className='upload-submit-btn' type="submit" disabled={disabled} >Upload</button>
            </form>
        </div>

        <form>

        </form>
        <div>
        
            <h4 className="work-header">Your Works:</h4>
            <div className="user-favorites-container">
                {items[0]? <FavoriteItems likedItems={items} /> : <h1></h1>}
            </div>
        </div>
    </div>
  )
}
