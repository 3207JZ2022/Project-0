import React from 'react'
import "./Item.css"
export default function Item({src, title}) {
  return (
    <div className="item-container">
        <img className="item-picture" src={src}></img>
        <h4 className="item-title" >{title}</h4>
    </div>
  )
}
