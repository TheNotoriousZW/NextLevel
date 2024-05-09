import React, {useEffect} from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 }
}



const WinModal = ({winModal, setWinModal, userIcon ,user, level, points, setPoints, setPointsStore, getPoints}) => {

 const handleButtonClick = () => {

  try {

    
    axios.put('http://127.0.0.1:8000/user-track', {username: user.username, points: points + 100, level: level})
    setPointsStore(points + 100)
    setPoints(getPoints())
     
  }
  catch(error)
  {
   console.log(error)
  }
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
