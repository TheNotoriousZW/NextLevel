import React, {createContext, useState} from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider, createRoutesFromElements, Route} from 'react-router-dom'
import SignUp from './routes/SignUp.jsx'
import UserProfile from './routes/UserProfile.jsx'
import Login from './routes/Login.jsx'




const router = createBrowserRouter([
  {
    path: "/",
    element: <UserProfile />,
  },
  {
    path: "register",
    element: <SignUp />,
  },
  {
    path: "login",
    element: <Login />,
    
  }
]);




ReactDOM.createRoot(document.getElementById('root')).render(
 

  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
  
)
