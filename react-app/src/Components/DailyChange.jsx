import React, {useEffect, useState} from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 }
}



const DailyChange = ({dailyChange, setDailyChange, dailyTargets, setDailyTargets, dailyRebuild, setDailyRebuild}) => {

  
 

 const handleClick =  () => {
  setDailyRebuild(false)
  setDailyChange(false)
 }

 const handleNoClick = () => {
  setDailyChange(false)
 }
  
  return (
    <AnimatePresence mode='wait'>
      
      { dailyChange && (
        <motion.div className='fixed top-0 left-0  w-[100%] h-[100%] z-[1] bg-gray-900 bg-opacity-90 flex'
          variants={backdrop}
          animate="visible"
          initial="hidden"
          exit="hidden"
        >
          <motion.div initial={{y: -200}} animate={{y: 0, duration: 5}} transition={{type: 'spring'}} className="border-none ring-2 mt-10 rounded-xl p-10 text-white mx-auto flex flex-col justify-center items-center h-1/4 self-start gap-2">
            <motion.h2 className="text-lg font-serif text-purple-600">Do you wish to Change your Daily Targets ?</motion.h2>
            <motion.p className="self-center ml-10 p-2 font-serif font-bold text-gray-500">You will rebuild your list<span className="px-4 text-purple-600">  |  </span>You will continue hitting your targets</motion.p>
            <div className="flex gap-4 mr-12">
            <motion.button onClick={() => handleClick()} className="ring-1 w-20 h-10 rounded-md mr-40 ml-4 hover:bg-blue-700/40 active:bg-blue-950">yes</motion.button>
            <motion.button onClick={() => handleNoClick()} className="ring-1 w-20 h-10 rounded-md hover:bg-blue-700/40 active:bg-blue-950 ">no</motion.button>
            </div>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default DailyChange
