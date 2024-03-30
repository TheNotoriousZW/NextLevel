import React from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 }
}



const Modal = ({showModal, setShowModal, confirm, setConfirm}) => {

  
  const tConfirm = "Once you set your sights on a target it MUST be hit. do you want to follow through?"
  
  return (
    <AnimatePresence mode='wait'>
      { showModal && (
        <motion.div className='fixed top-0 left-0  w-[100%] h-[100%] z-[1] bg-gray-900 bg-opacity-60 flex'
          variants={backdrop}
          animate="visible"
          initial="hidden"
          exit="hidden"
        >
          <motion.div initial={{y: -200}} animate={{y: 0, duration: 5}} transition={{type: 'spring'}} className="border-none rounded-xl p-10 text-white mx-auto flex flex-col justify-center items-center h-1/4 self-start ">
            <motion.h2 className="text-red-700 font-bold text-2xl">Warning</motion.h2>
            <p>Once you set your sights on a target it <span className="font-bold">MUST</span> be hit. do you want to follow through?</p>
            <p>Wait period before target change</p>
            <p>Daily: 7 days | Proactive: 2 Weeks | Yearly : 1 year</p>
            <div className="flex gap-2">
              <motion.button initial={{x: -500}} animate={{x: 0, duration: 5}} transition={{type: 'spring', stiffness: 250 }} className="border-none ring-2 p-2 rounded-xl w-20 ring-sky-50 shadow-md font-bold mt-2 bg-indigo-700 text-black shadow-sky-50" onClick={() => {

               setConfirm(true)
               setShowModal(false)
               
               
               }}>yes</motion.button>
              <motion.button initial={{x:  500}} animate={{x: 0, duration: 5}} transition={{type: 'spring', stiffness: 250 }} className="border-none ring-2 p-2 rounded-xl w-20 ring-sky-50 shadow-md font-bold mt-2 bg-rose-900 text-black shadow-sky-50" 
              onClick={() => 
              {
                setConfirm(false) 
                setShowModal(false) }}>no</motion.button>
            </div>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Modal
