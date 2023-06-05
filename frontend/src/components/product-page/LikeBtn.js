import "./LikeBtn.css"
import FavoriteIcon from '@mui/icons-material/Favorite';
import {useNavigate} from 'react-router-dom';

import React, {useEffect, useState} from 'react'

export default function LikeProduct(props) {
  const navigate = useNavigate();
  const[like, setLike]= useState(false)

    //obtain like status
    useEffect(() => {
      fetch('http://localhost:8000/user/likes/'+props.releasedID,{
          method:"POST",
          mode:"cors",
          credentials: "include", 
          headers: { 
          'Content-Type':'application/json',
          'Accept':'application/json'
          }
      })
      .then(response => response.json())
      .then(data=>{
          setLike(data.like);
      });
  },[])

  // like-button event
  const [disable, setDisable]=useState(true);

  function floatBox(){
    setDisable(false);
    setTimeout(() =>{
      setDisable(true);
    }, 1000)
  }
  function handleLikeClick(){
    if(disable){
        fetch('http://localhost:8000/user/likes/'+props.releasedID,{
            method:"PATCH",
            mode:"cors",
            credentials: "include", 
            headers: { 
            'Content-Type':'application/json',
            'Accept':'application/json'
            },
            body: JSON.stringify({})
        })
        .then(response => response.json())
        .then(data=>{
            if(data.requireLogin){
                navigate('/login')
            }
            setLike(data.like);
            floatBox();
        }).catch(err => {console.log(err)});
    }
}
  let temp = (like? "Like":"Unlike");




  return (
    <div className={'like-btn '+like} onClick={handleLikeClick}>


      <div className={"like-btn-container " + like}>
          <FavoriteIcon fontSize="large" />
      </div>

      <h5 className={"pop-messeage " + disable} >{temp}</h5>
  </div>



  )
}
