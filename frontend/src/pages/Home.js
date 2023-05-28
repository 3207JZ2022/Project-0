import './Home.css';
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import PopularProducts from '../components/home-page/PopularProducts';
import NewsList from '../components/home-page/NewsList';
import React, { useEffect } from 'react';
import ProfileBtn from '../components/user/ProfileBtn';
import {useState} from 'react';


function Home(){
    // load page
    const[newsData, setNewsData] = useState([0])
    const[productData, setProductData] = useState([0])
    useEffect(()=>{
        fetch("http://localhost:8000/news",{
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            credentials: "include", 
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json, text/javascript, image/jpg'
            }
        })
        .then(response => response.json())
        .then(data=>{
            let temp=data.map((x, index)=>{
                if(!x.title.trim()){
                    x.title="No Title";
                }
                return {
                    title:x.title,
                    description:x.descrip,
                    src: "http://localhost:8000/imgs/" + x.src,
                    id: x.id
                }
            })
            setNewsData(temp);
        })

        fetch("http://localhost:8000/product",{
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            credentials: "include", 
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json, text/javascript, image/jpg'
            }
        })
        .then(response => response.json())
        .then(data=>{
            let temp=data.map((x, index)=>{
                if(!x.title.trim()){
                    x.title="No Title";
                }
                return {
                    title:x.title,
                    description:x.descrip,
                    src: "http://localhost:8000/imgs/" + x.src,
                    id: x.id
                }
            })
            setProductData(temp);
        })
    }, [])


    return(
        <div className="home-container">
            <Header/>
            <ProfileBtn />
            {/* popular */}
            <PopularProducts productsData={productData}/>
            {/* news */}
            {NewsList(newsData)}

            <Footer /> 
        </div>
    )
}

export default Home;