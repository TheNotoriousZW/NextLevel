import React, {useEffect} from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { userUpdate } from './utils'

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 }
}



const WinModal = ({winModal, setWinModal, userIcon ,user, level, points, setPoints, setPointsStore, getPoints}) => {

 const handleButtonClick = () => {

  userUpdate(user.username, points, level, setPointsStore, setPoints, 100, getPoints)
  setWinModal(false)
  
 }
  
  return (
    <AnimatePresence mode='wait'>
      
      { winModal && (
        <motion.div className='fixed top-0 left-0  w-[100%] h-[100%] z-[1] bg-gray-900 bg-opacity-90 flex'
          variants={backdrop}
          animate="visible"
          initial="hidden"
          exit="hidden"
        >
          <motion.div initial={{y: -200}} animate={{y: 0, duration: 5}} transition={{type: 'spring'}} className="border-none ring-2 mt-10 rounded-xl p-10 text-white mx-auto flex flex-col justify-center items-center h-1/4 self-start ">
            <motion.h2 className="text-purple-600 font-bold text-2xl">Great Work , You win the day</motion.h2>
            <p>You Earned <span className="text-purple-600 font-bold">100</span> More points</p>
            <motion.button onClick={() => handleButtonClick()}><img src={userIcon} className="h-20 mt-2 animate-bounce"/></motion.button>
          
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default WinModal
