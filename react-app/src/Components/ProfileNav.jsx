import React, { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import eclass from '../assets/eclass.png'
import aclass from '../assets/aclass.png'
import bclass from '../assets/bclass.png'
import cclass from '../assets/cclass.png'
import dclass from '../assets/dclass.png'
import sclass from '../assets/sclass.webp'
import logout from '../assets/logout.png'
import { motion } from 'framer-motion'
import { useLocalStorage } from '../useLocalStorage'
import axios from 'axios'

const ProfileNav = (props) => {

 
  
  const username = props.user.username
  
  useEffect(() => {
    
  })
  
  

 console.log(props.points)
  
useEffect(() => {
  if(props.points > 29999 && props.points < 45000){
    props.setUserIcon(dclass)
    props.setLevel('D class')
  }
  else if(props.points > 45000 && props.points < 70000){
    props.setUserIcon(cclass)
    props.setLevel('C class')
  }
  else if(props.points > 70000 && props.points < 100000){
    props.setUserIcon(bclass)
    props.setLevel('B class')
  }
  else if (props.points > 100000 && props.points < 156000){
    props.setUserIcon(aclass)
    props.setLevel('A class')
  }
  else if (props.points > 156000) {
    props.setUserIcon(sclass)
    props.setLevel('S class')
    const rank_text = document.getElementById("rank")
    rank_text.classList.add("text-yellow-200")
  }
  else if (props.points < 29999){
    props.setUserIcon(eclass)
    props.setLevel('E class')
  }

})
 

  const navigate = useNavigate()


  const handleLogout = () => {
    
    navigate('login', {replace: true})
  }

  //bg-gradient-to-r from-black  to-purple-600/100 bg-opacity-75
  return (
    <motion.div className="flex h-20 md:rounded-lg text-white md:p-2 px-28 w-auto md:w-auto md:m-5 ring-sky-200/50 shadow-md bg-gradient-to-r from-black  to-purple-600/40 bg-opacity-25 ring-1 ring-sky-200 md:justify-center items-center md:gap-20 gap-6 ">
     <div className="md:h-10 w-10 md:ml-0 ml-[-34px] absolute md:start-10 start-10 cursor-pointer p-1 rounded-full flex items-center font-bold md:mr-10 ">
        <img onClick={() => handleLogout()}src={logout} alt='logout' className="hover:animate-bounce transition-all self-start"/>
        <p className="font-serif text-gray-400 underline">logout</p>
     </div>
     <motion.div className="flex md:gap-2 font-bold items-center  ">
      <motion.p  animate={{x: 0, duration: 3}} transition={{type: "spring", stiffness: "250"}} className="text-white text-sm font-serif rounded-md md:p-2 ">Honors: <motion.span initial={{}} className="self-center text-white">{props.points}</motion.span></motion.p>
     </motion.div>
     <motion.div initial={{y: -50}} animate={{y: 0, duration: 3}} transition={{type: "spring", stiffness: 140}}className=" flex text-white font-bold md:p-4 rounded-md h-10 w-auto bg-opacity-25 text-md font-serif self-center mt-1">
      <p className="self-center underline">{username}</p>
     </motion.div>
     <motion.div drag="x" dragConstraints={{left: 50, right: 300}} dragElastic={0.5} className="w-30 h-10 self-center flex shrink-[4] shadow-sm rounded-xl">
      <motion.img initial={{scale: 1, x: -10}}src={props.userIcon} className="rounded-full ring-1 ring-sky-100 h-12 w-12 shadow-sky-200 "/>
      <p id="rank" className="font-bold self-center text-m font-serif underline text-white">{props.level}</p>
     </motion.div>
    </motion.div>
  )
}

export default ProfileNav
