import './SearchBar.css'
import SearchIcon from '@mui/icons-material/Search';
import React,{useRef} from 'react'
import { useNavigate } from 'react-router';

export default function SearchBar(props) {

    const searchInput=useRef();

    const navigate = useNavigate();
    const searchQuery = (e) =>{
        const temp = searchInput.current.value.trim();
        if(temp.length!=0){
            navigate('/search?query='+temp);
        }
        e.preventDefault();
    }

    return (
        <div className="search-bar-container">
            <form className="search-form" onSubmit={(e)=>{searchQuery();}}>
                <input className="search-input " name="searchInput" type="text" 
                    autoComplete='off' ref={searchInput} 
                    placeholder={props.searchInput}/>
                <button className="search-icon" type="submit" onClick={searchQuery}>
                    <SearchIcon />
                </button>
            </form>
        </div>
    )
}
