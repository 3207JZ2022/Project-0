import * as React from "react"
import { Link } from 'react-router-dom';
import './Header.css';
import SearchBar from "./SearchBar";
import NavigationMenu from "./NavigationMenu";

function Header(props){

    return (<div className="nav-bar-container">
        <div className="nav-grid-container">
            <div className='nav-grid0'>
                <Link  to='/' relative="path">Website</Link>
            </div>
            <div className="nav-grid1">
               <SearchBar searchInput={props.searchInput}/>
            </div>
            <div className='nav-grid2'>
                <NavigationMenu />
            </div>
        </div>
    </div>)
}

export default Header;
