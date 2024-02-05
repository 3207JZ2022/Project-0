import './Home.css';
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import PopularProducts from '../components/home-page/PopularProducts';
import NewsList from '../components/home-page/NewsList';
import React, { useEffect } from 'react';
import ProfileBtn from '../components/user/ProfileBtn';
import {useState} from 'react';


import homeStore from '../store/homeStore';
import { sendAction } from '../store/action/home';

function Home(){
    // load page
    const[newsData, setNewsData] = useState([0])
    const[productData, setProductData] = useState([0])
    useEffect(()=>{

        const sub= homeStore.subscribe(()=>{
            console.log(homeStore.getState());

        })
        homeStore.dispatch(sendAction());

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
                    author:x.author,
                    releasedID: x.releasedID,
                    src: "http://localhost:8000/imgs/" + x.releasedID
                }
            })
            setNewsData(temp);
        })

        fetch("http://localhost:8000/popularproducts",{
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
                    author:x.author,
                    src: "http://localhost:8000/imgs/" + x.releasedID,
                    releasedID: x.releasedID
                }
            })
            setProductData(temp);
        })

        return ()=>{
            sub();
        }
    }, []
    )


    return(
        <div className="home-page">
            <Header/>
            <div className="home-body">
                <ProfileBtn />
                {/* popular */}
                <PopularProducts productsData={productData}/>
                {/* news */}
                {NewsList(newsData)}
            </div>


            <Footer /> 
        </div>
    )
}

export default Home;