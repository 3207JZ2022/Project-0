import React from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { Outlet,} from 'react-router';
import {NavLink } from 'react-router-dom'
import './Profile.css'
export default function Profile() {

    return (
        <div className="profile-page">
            <Header />
            <div className="page-body">
                <div>
                    <div className="profile-nav" >
                        <NavLink end to="/profile" activeclassname="active">Profile</NavLink>
                        <NavLink exact="true" to="/profile/userfavorites" activeclassname="active">Favorites</NavLink>
                        <NavLink exact="true" to="/profile/userworks" activeclassname="active">Works</NavLink>
                    </div>
                </div>
                <div className="page-cotent">
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
    )
}