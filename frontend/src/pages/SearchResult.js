import React, {useState,  useEffect} from 'react'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer';
import ItemList from '../components/search-content/ItemList'
import { useSearchParams } from 'react-router-dom';
import "./SearchResult.css"

export default function SearchResult() {
    const [result, setResult]=useState([]);
    const [params] = useSearchParams();
    const query=params.get('query');
    useEffect(()=>{
        fetch("http://localhost:8000/search/" + query )
        .then(response => response.json())
        .then(data=>{
            let temp=data.map((x, index)=>{
                return {
                    author: x.author,
                    title:x.title,
                    alt:x.title,
                    description:x.descrip,
                    src: "http://localhost:8000/imgs/" + x.releasedId,
                    releasedID: x.releasedId
                }
            })
            setResult(temp);
        })
    }, [params.get('query')])
    
  return (
    <div className="search-result-page">
        <Header searchInput={query}/>
        <div className="search-result-display" >
            {  result[0]?
            <div className="search-result">
                <ItemList searchResults={result}></ItemList>
            </div>
            : 
            <div className="no-items-found">
                <h1 >Found 0 Item</h1>
            </div>
            }
        </div>
        <Footer />
    </div>

  )
}
