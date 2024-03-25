
import React, {createContext, useState} from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider, createRoutesFromElements, Route} from 'react-router-dom'
import SignUp from './routes/SignUp.jsx'
import UserProfile from './routes/UserProfile.jsx'
import Login from './routes/Login.jsx'
import LoginForm from './LoginForm.jsx'




const App = () => {

  
  
  const [token, setToken] = useState("token")

  return (
    <>
    
        <SignUp/>
        <UserProfile />
        <LoginForm />
 
    </>
  )
}

export default App
