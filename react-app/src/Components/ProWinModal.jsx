import React, {useEffect} from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 }
}



const ProWinModal = ({proWinModal, setProWinModal, userIcon, setPointsStore, points}) => {

 const handleButtonClick = () => {
  setPointsStore(points += 500)
  setProWinModal(false)
 }
  
  return (
    <AnimatePresence mode='wait'>
      
      {proWinModal && (
        <motion.div className='fixed top-0 left-0  w-[100%] h-[100%] z-[1] bg-gray-900 bg-opacity-90 flex'
          variants={backdrop}
          animate="visible"
          initial="hidden"
          exit="hidden"
        >
          <motion.div initial={{y: -200}} animate={{y: 0, duration: 5}} transition={{type: 'spring'}} className="border-none ring-2 mt-10 rounded-xl p-10 text-white mx-auto flex flex-col gap-2 justify-center items-center h-1/4 self-start ">
            <motion.h2 className="text-purple-600 mt-4 font-bold text-2xl">Excellent, Your Prudence has Won you the week</motion.h2>
            <p>You Earned <span className="text-purple-600 font-bold">500</span> More points</p>
            <motion.button onClick={() => handleButtonClick()}><img src={userIcon} className="h-20 mt-2 animate-bounce"/></motion.button>
          
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ProWinModal
