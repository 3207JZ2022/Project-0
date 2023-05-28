import React from 'react'
import "./LikeBtn.css"
import FavoriteIcon from '@mui/icons-material/Favorite';


export default function LikeProduct(props) {


  return (
    <div className={"like-btn-container " + props.liked}>
        <FavoriteIcon fontSize="large" />
    </div>
  )
}
