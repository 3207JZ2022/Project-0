import React, {useRef} from 'react'
import { useNavigate } from 'react-router';
import './ItemList.css'
import Item from './Item.js'
export default function ItemList({searchResults=[]}) {
  const itemRef = useRef();
  const navigate=useNavigate();
  function navToProduct(e){
      const value =e.currentTarget.value;
      navigate('/products?releasedID=' +value )
  }

  return (
    <div>
        <ul className="query-item-list">
            {searchResults.map((x,index)=>{return(
                <li className="query-item-container" 
                value={x.releasedID}  key={index} onClick={navToProduct} ref={itemRef}>
                    <Item title={x.title} src={x.src} ></Item>
                </li>)
            })}
        </ul>
    </div>
  )
}
