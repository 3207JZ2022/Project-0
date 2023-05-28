import React, {useEffect, useState} from 'react'
import {useNavigate ,useSearchParams} from 'react-router-dom';
import Header from '../components/header/Header'
import Product from '../components/product-page/Product'
import LikeBtn from '../components/product-page/LikeBtn.js';
import NotFound from './NotFound.js'

import './Products.css'

export default function Products() {
    const [params] = useSearchParams();
    const id=params.get('id');

    const navigate = useNavigate();

    // load page
    const[productData, setProductData] = useState({})
    const[like, setLike]= useState(false)

    useEffect(()=>{
        fetch("http://localhost:8000/product/" + id )
        .then(response => response.json())
        .then(data=>{
            if(data[0]){
                let temp={};
                temp.title=data[0].title;
                temp.alt=data[0].alt;
                temp.description=data[0].descrip;
                temp.id=data[0].id;
                temp.src=[];
                data.map((x,index)=>{
                    temp.src.push(  "http://localhost:8000/imgs/" +x.src)
                })
                setProductData(temp);
            }


        })
    }, []
    );

    useEffect(() => {
        fetch('http://localhost:8000/user/likes/'+id,{
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
            fetch('http://localhost:8000/user/likes/'+id,{
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
      <div className='products-page' >
        <Header />

        <div className='products-body'>
        {productData.title? <Product {...productData} />: <NotFound />}
          </div>

        {productData.title? 
        <div className={'like-btn '+like} onClick={handleLikeClick}>
            <LikeBtn liked={like}  />
            <h5 className={"pop-messeage " + disable} >{temp}</h5>
        </div>
        :<p></p>
          }
      </div>
    )
}
