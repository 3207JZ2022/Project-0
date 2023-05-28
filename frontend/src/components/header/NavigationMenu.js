import React, {useState} from 'react'
import './NavigationMenu.css'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link} from 'react-router-dom';
import LoginPortal from './LoginPortal';
export default function NavigationMenu() {

    const [navState, setNavState] =useState("");

    const toggleMenu=()=>{
        if(navState.length===0){
            setNavState("active");
        }else{
            setNavState("");
        }
    }


  return (
    <div className="navigation-menu-container">
        <div className="nav-menu-toggle" onClick={toggleMenu}>
            <MenuIcon className={"open-menu-icon " + navState}  />
            <CloseIcon className={"close-menu-icon "+ navState}  />
        </div>

        <ul className={"nav-menu-list "+navState} >
            <li className="nav-menu-item nav-menu-first-item"><Link  to='/' relative="path">Home</Link></li>
            <li className="nav-menu-item">
                <LoginPortal />
            </li>
            <li className="nav-menu-item">
                <Link  to='/Contact' relative="path">Contact</Link>
            </li>
        </ul>
        
    </div>
  )
}
