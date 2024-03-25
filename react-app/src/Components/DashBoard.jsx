import React, {useState, useEffect} from 'react'
import axios from 'axios'
import usertarget from '../assets/usertarget.png'
import {useNavigate , useLocation} from 'react-router-dom'


const DashBoard = () => {

  const [userCount, setUserCount] = useState(0);

  let location = useLocation();
  const navigate = useNavigate();
  console.log(location)

  const handleClick = () => {

    if(location.pathname === "/register"){
      navigate("/login")
    }
    else if(location.pathname === "/login"){
      navigate("/register")
    }
    
    
  }

  useEffect(() => {

    try 
    {
       axios.get('http://127.0.0.1:8000/users-count').then((response) => {
        setUserCount(response.data)
      })
      }
    catch(error){
      console.error(error)
    }
    
    
  }, [userCount])


  
  return (
    <div className="flex w-full border border-blue-400 mt-0 h-20 bg-blue-400 ring-4 rounded-lg space-x-96">
      <div className="flex justify-start">
            <div className=" ml-4">
              <img src={usertarget} alt="" className="w-10 h-10"/>
              <p className="text-white font-bold text-xl">Users: {userCount}</p>
            </div>
      </div>
      <div className="self-center">

              <button onClick={() => handleClick()}className="ml-[170px] border font-bold border-white p-2 rounded-lg ring-2 ring-blue-300 text-white hover:shadow-xl shadow-gray-300 hover:bg-blue-500 focus:bg-blue-800">{location.pathname === "/register" ? "Login": "Register"}</button>
            
      </div>
      
    </div>
  )
}

export default DashBoard
