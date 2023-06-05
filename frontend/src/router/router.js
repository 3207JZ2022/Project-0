import Home from '../pages/Home';
import Login from '../pages/UserAuthen/Login';
import Register from '../pages/UserAuthen/Register';
import Products from '../pages/Products.js';
import NotFound from '../pages/NotFound';
import Contact from '../pages/Contact.js';
import Profile from '../pages/UserProfile/Profile'
import {createBrowserRouter, Routes, Route} from 'react-router-dom';
import SearchResult from '../pages/SearchResult';
import Header from '../components/header/Header'
import UserFavorites from '../pages/UserProfile/UserFavorites';
import UserInfo from "../pages/UserProfile/UserInfo"
import UserWorks from "../pages/UserProfile/UserWorks"
const router = createBrowserRouter([{element:<Header />},
  {
    path:'/',
    element: <Home />
  },{
    path:'/products',
    element:<Products />,
  },{
    path:'/profile',
    element:<Profile />,
    children:[
      {
        path:'/profile',
        index:true,
        element:<UserInfo />
      },
      {
        path:'/profile/userfavorites',
        element:<UserFavorites />
      },
      {
        path:'/profile/userworks',
        element:<UserWorks />
      }
    ]

  },{
    path:'/search',
    element:<SearchResult />
  },{
    path:'/login',
    element: <Login />
  },{
    path:'/register/*',
    element: <Register />
  },{
    path:'/contact',
    element:<Contact />    
  },{
    path:'/profile',
    element:<Profile />
  },{
    path:'/*',
    element:<NotFound />
  }
])



export default router;