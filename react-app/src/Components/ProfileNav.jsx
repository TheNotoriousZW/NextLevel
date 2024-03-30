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

const ProfileNav = (props) => {

 
  
  const username = props.user.username
  
  
  

 
  
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
    <motion.div initial={{scale: 0.9}} className="flex h-20 rounded-lg text-white w-90  m-5 ring-1 ring-sky-200/50 shadow-md bg-gradient-to-r from-black  to-purple-600/40 bg-opacity-25 ring-1 ring-sky-200 justify-center items-center gap-20 flex-auto">
     <div className="h-10 w-10 absolute start-10 cursor-pointer p-1 rounded-full flex items-center font-bold mr-2 ">
        <img onClick={() => handleLogout()}src={logout} alt='logout' className="hover:animate-bounce transition-all"/>
        <p className="font-serif text-gray-400">logout</p>
     </div>
     <motion.div className="flex gap-2 font-bold items-center  ">
      <motion.p initial={{x: -100 }} animate={{x: 0, duration: 3}} transition={{type: "spring", stiffness: "250"}} className="text-white text-lg font-serif shadow-sm ring-1 ring-sky-100 bg-purple-700/60 shadow-sky-200 rounded-md p-2">Honors: <motion.span initial={{}} className="self-center text-white">{props.points}</motion.span></motion.p>
       
     </motion.div>
     <motion.div initial={{y: -50}} animate={{y: 0, duration: 3}} transition={{type: "spring", stiffness: 140}}className="border flex text-white font-bold p-4 rounded-md h-10 w-auto bg-opacity-25 text-lg shadow-sm ring-indigo-500 bg-purple-700/60 shadow-sky-200 font-serif self-center mt-1">
      <p className="self-center">{username}</p>
     </motion.div>
     <motion.div drag="x" dragConstraints={{left: 50, right: 300}} dragElastic={0.5} className="w-40 h-10 self-center bg-purple-700/60 gap-1 flex shrink-[4] shadow-sky-200 shadow-sm rounded-xl ring-1 ring-sky-200 ">
      <motion.img initial={{scale: 1, x: -10}}src={props.userIcon} className="rounded-full h-12 w-12 shadow-sky-200 "/>
      <p id="rank" className="font-bold self-center text-m font-serif  text-white">{props.level}</p>
     </motion.div>
    </motion.div>
  )
}

export default ProfileNav
