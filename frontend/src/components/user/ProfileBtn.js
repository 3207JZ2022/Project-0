import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './ProfileBtn.css'
import { useNavigate } from 'react-router';
export default function UserProfile() {

    const navigate = useNavigate();


    function navToProfile(){
        navigate('./profile');
    }
  return (
    <div className="user-profile-container">
        <AccountCircleIcon fontSize="large" onClick={navToProfile} />
    </div>
  )
}
