import React from 'react'
import "./Footer.css"
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
const webCollection=[{
    name: "GitHub",
    href: "https://github.com/3207JZ2022",
    description: "My GitHub" , 
},
{
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/jian-zhang-595154201/",
    description: "My LinkedIn Profile"  , 
}]

export default function Footer(){
    return(
        <div className="footer-container">
            <div className="footer-grid-container">
                <h1 className ="footer-logo">LOGO</h1>
                <div className="footer-icon-container">
                    <a className="footer-1 link-icons" href ={webCollection[0].href} ><GitHubIcon /> </a> 
                    <a className="footer-2 link-icons" href ={webCollection[1].href} ><LinkedInIcon /> </a> 
                </div>
            </div>
        </div>

    )
}


