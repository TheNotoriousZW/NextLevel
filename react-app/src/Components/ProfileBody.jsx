import React, {useState , useEffect} from 'react'
import target5 from '../assets/target5.png'
import { useLocalStorage } from '../useLocalStorage';
import {animate, motion, AnimatePresence} from 'framer-motion'
import axios from 'axios'
import { giveBonus, userUpdate, targetUpdate, levelTrack, targetCreate, targetChange, fetchData} from './utils';
import { set } from 'react-hook-form';
import { compileString } from 'sass';



const ProfileBody = (props) => {

  const user = props.getUser();
  
  // Time variables
  const oneDay = 1000 * 60 * 60 * 24
  const oneHour = 1000 * 60 * 60
  const oneWeek = oneDay * 7
  const oneYear = oneDay * 365

  //Targets
  const [target, setTarget] = useState({
    username: user,
    name: "",
    startTime: new Date(),
    completed: false,
    EndTime: undefined,
    consistency: 0.0,
    points: 5,
    origin: new Date(),
    bonus: 0
  });

  //local storage state
  const {setItem: setDailyTargets, getItem: getDailyTargets} = useLocalStorage("dailytargets")
  const {setItem: setProactiveTargets, getItem: getProactiveTargets} = useLocalStorage("proactivetarget")
  const {setItem: setYearlyTargets, getItem: getYearlyTargets} = useLocalStorage("yearlytarget")
  const {setItem: setLevel , getItem: getLevel} = useLocalStorage("level")
 
  //react app state
  const [dailyTargets, setDailyTargetsFront] = useState([]);
  const [proactiveTargets, setProactiveTargetsFront] = useState([]);
  const [yearlyTargets, setYearlyTargetsFront] = useState([]);
 
  //setTargets
  useEffect(() => {

    const url = `http://127.0.0.1:8000/userDtarg?username=${user}`
    fetchData(url, setDailyTargets, setDailyTargetsFront);

  },[user]);

  useEffect(() => {

    const url = `http://127.0.0.1:8000/userPtarg?username=${user}`
    fetchData(url, setProactiveTargets, setProactiveTargetsFront);

  },[user]);

  useEffect(() => {

    const url = `http://127.0.0.1:8000/userYtarg?username=${user}`
    fetchData(url, setYearlyTargets, setYearlyTargetsFront);

  },[user]);
  

  useEffect(() => {
  
    props.setLevel(getLevel())
    props.setPoints(props.getPoints())

  })
 
useEffect(() => {

  levelTrack(props.points, setLevel)
 
})
  

  //HANDLE INPUTS
  function handleTargetChange(e, id){
    document.getElementById(id).classList.remove("hidden")
    if(e.target.value.length > 0){

      setTarget({...target, username: user, name: e.target.value, startTime: Date.now(), completed: false, consistency: 0.0, points: 5, origin: new Date(), bonus: 0})
      
    }
    if(e.target.value.length > 1 && e.target.value.length < 3){
      props.setShowModal(true)
    }
    if (e.target.value.length === 0){

      document.getElementById(id).classList.add("hidden")
    }
  
    }
    
  // HANDLE TARGET SET
 async function handleDailyTargetButton(){

      const url = 'http://127.0.0.1:8000/userDt'
      
      if (props.confirm){
        
        document.getElementById("dailytarget").value = ""
        document.getElementById("dtsubmit").classList.add("hidden")

        targetCreate(target, url, setTarget, setDailyTargetsFront, dailyTargets, 5)
        
           }
      else {
            
            setTarget("")
            document.getElementById("dailytarget").value = ""
            document.getElementById("dtsubmit").classList.add("hidden")
           }
      } 
      
  function handleProactiveTargetButton(){

    const url = 'http://127.0.0.1:8000/userPt'

    if (props.confirm){

      document.getElementById("proactivetarget").value = ""
      document.getElementById("ptsubmit").classList.add("hidden")

      targetCreate(target, url, setTarget, setProactiveTargetsFront, proactiveTargets, 50)
      
    }
    else {
          
          setTarget("")
          document.getElementById("proactivetarget").value = ""
          document.getElementById("ptsubmit").classList.add("hidden")
         }
  }

  function handleYearlyTargetButton(){

    const url = 'http://127.0.0.1:8000/userYt'

    if (props.confirm){

      document.getElementById("yearlytarget").value = ""
      document.getElementById("ysubmit").classList.add("hidden")

      targetCreate(target, url, setTarget, setYearlyTargetsFront, yearlyTargets, 1500)
      
         }
    else {
          
          setTarget("")
          document.getElementById("yearlytarget").value = ""
          document.getElementById("ysubmit").classList.add("hidden")
         }
  }
  
  /****************************************************************/
  //HANDLE TARGET COMPLETION
 
useEffect(() => {

  if (dailyTargets.every((target) => target.completed)){
      const url = 'http://127.0.0.1:8000/Dt'
      giveBonus(dailyTargets, url, props.setWinModal, 6)
  }
},[props.points])

useEffect(() => {

  if (proactiveTargets.every((target) => target.completed)){
      const url = 'http://127.0.0.1:8000/Pt'
      giveBonus(proactiveTargets, url, props.setProWinModal, 3)
  }
},[props.points])

useEffect(() => {

  if (yearlyTargets.every((target) => target.completed)){
      const url = 'http://127.0.0.1:8000/Yt'
      giveBonus(yearlyTargets, url, props.setYearWinModal, 3)
  }
},[props.points])

  async function handleDailyTargetCompletion(target){

    const url = 'http://127.0.0.1:8000/Dt'

    target.end_time = Date.now()
    target.start_time = new Date(target.start_time)
  
    const timedifference = (target.end_time - target.start_time)
    const days = timedifference / oneDay
    
    if (days < 0.1) {
      
      target.consistency += 0.2;
      target.completed = true;
      target.bonus += 1;
      
      userUpdate(user, props.points, props.level, props.setPointsStore, props.setPoints, target.points, props.getPoints)

      targetUpdate(target.target_name, url, target.start_time, target.completed, target.consistency, target.bonus, target.points)
    
    }
  }

  async function handleProactiveTargetCompletion(target){

    const url = 'http://127.0.0.1:8000/Pt'

    target.end_time = Date.now()
    target.start_time = new Date(target.start_time)

    const timedifference = (target.end_time - target.start_time)
    const weeks = timedifference / oneWeek
    if (weeks < 1) {

      target.consistency += 0.2;
      target.completed = true;
      target.bonus += 1;
      
      userUpdate(user, props.points, props.level, props.setPointsStore, props.setPoints, target.points, props.getPoints)

      targetUpdate(target.target_name, url, target.start_time, target.completed, target.consistency, target.bonus, target.points)

    }
  }

  function handleYearlyTargetCompletion(target){

    const url = 'http://127.0.0.1:8000/Yt'

    target.end_time = Date.now()
    target.start_time = new Date(target.start_time)

    const timedifference = (target.end_time - target.start_time)
    const years = timedifference / oneYear

    if (years < 1) {
      
      target.consistency += 0.5;
      target.completed = true;
      target.bonus += 1;

      userUpdate(user, props.points, props.level, props.setPointsStore, props.setPoints, target.points, props.getPoints)

      targetUpdate(target.target_name, url, target.start_time, target.completed, target.consistency, target.bonus, target.points)

    }
  }
 
//Handle Target Change 
useEffect(() => {
  
   targetChange(dailyTargets, 6, oneDay, props.setDailyChange,)
})

useEffect(() => {
  
  targetChange(proactiveTargets, 3, oneWeek, props.setProactiveChange,)
  
})

useEffect(() => {
  
  targetChange(yearlyTargets, 3, oneYear, props.setYearlyChange,)

})

  // Ui logic
  return (
    
    <div className="flex justify-center flex-col gap-2 w-full h-full ">
      <div className="md:flex flex justify-center mx-2 md:w-full w-full items-center md:ml-0 ml-18 m-2">
        <AnimatePresence >
        <div key="1" className="flex mt-2 ">
            <motion.input  id="dailytarget" placeholder="Daily" initial={{scale: 0}} animate={{scale: 1}} transition={{delay: .5}} exit={{scale: 0}} onChange={(e) => handleTargetChange(e, "dtsubmit")} required minLength={4} className={`rounded-md border h-2 p-4 outline-none ring-2 focus:bg-black ring-indigo-500 text-purple-400 md:text-md text-md font-bold font-serif md:w-auto w-24 focus:w-32 md:focus:w-auto md:focus:ml-0 focus:ml-10 shadow-md bg-slate-800 shadow-purple-500 ${dailyTargets.length >= 6 && "hidden"}`}/>
            <motion.button id="dtsubmit" whileHover={{scale: 1.1}} onClick={() => handleDailyTargetButton()} className="h-10 w-10 hidden"><img src={target5}/></motion.button>
        </div>
        <div key="3" className='flex mt-2'>
          <motion.input id="proactivetarget" placeholder="Proactive"  initial={{scale: 0}} animate={{scale: 1}} transition={{delay: .5}} exit={{scale: 0}} onChange={(e) => handleTargetChange(e, "ptsubmit")} required minLength={4}  className={`rounded-md border h-2 p-4  outline-none ring-2 mx-2 focus:bg-black ring-indigo-500 text-purple-400 text-sm md:text-md font-bold font-serif md:w-auto w-28 shadow-md bg-slate-800 shadow-purple-500 ${proactiveTargets.length >= 3 && "hidden"}`}/>
            <button id="ptsubmit" onClick={() => handleProactiveTargetButton()} className="h-10 w-10 hidden"><img src={target5}/></button>
          
        </div>
        <div key="2" className='flex mt-2 '>
          <motion.input placeholder="Yearly" id="yearlytarget"  initial={{scale: 0}} animate={{scale: 1}} transition={{delay: .5}} exit={{scale: 0}} onChange={(e) => handleTargetChange(e, "ysubmit")} required minLength={4} className={`rounded-md border h-2 p-4  outline-none ring-2 focus:bg-black  ring-indigo-500 text-purple-400 md:text-md text-md font-bold font-serif md:w-auto w-24 shadow-md focus:w-32 md:focus:w-auto bg-slate-800 shadow-purple-500 ${yearlyTargets.length >= 3 && "hidden"}`}/>
            <button id="ysubmit" onClick={() => handleYearlyTargetButton()} className="h-10 w-10 hidden"><img src={target5}/></button>
          
        </div>
        </AnimatePresence>
      </div>
      <AnimatePresence>
      <motion.div initial={{y: -200}} animate={{y:0}}  transition={{ type: "spring", stiffness: 200}} className="md:flex justify-around md:h-[350px] gap-1 m-8 mt-5 mb-40">
        <motion.div whileHover={{
          scale: 1.1,
          boxShadow: "0px 0px 8px rgb(255,255,255)"
        }} drag dragConstraints={{left: -120, right: 360, top: -50, bottom: 50}} dragElastic={2} className="bg-gradient-to-b from-sky-300 to-purple-500  md:flex rounded-3xl p-1 shadow-lg shadow-purple-300 ">
          <div className=" bg-zinc-950 p-10 rounded-[calc(1.5rem-0.25rem)] flex flex-col gap-4 ">
            <h1 className="font-bold text-purple-400 text-2xl font-serif border-b-2 self-center border-indigo-600 h-10">Daily</h1>
            <div className="">
            <ul>
              {dailyTargets.map((target, index) => (
                <div key={`${index} child`} className="flex border-b border-blue-200">
                  { target.completed ? <li className="text-gray-500 font-serif  text-lg">{target.target_name} - Completed</li> : 
                    <motion.li whileHover={{scale: 1.6, originX:0 }} transition={{type: 'spring', stiffness: 200}} key={`${index + 1} child`} className=" w-40 font-serif text-purple-500 mb-2 text-lg">{target.target_name}</motion.li>}
                   {target.completed === false  && <motion.button key={`${index +2} child`} whileHover={{scale: 1.1, boxShadow: "0px 0px 8px rgb(255,255,255)"}} initial={{scale: 0.2} }animate={{ scale: 1, rotate: 180, opacity: 0.5}} transition={{repeat: Infinity, duration: 2, ease: "easeIn"}} onClick={() => handleDailyTargetCompletion(target)} className=" self-center "><img className="w-5 h-5" src={target5} /></motion.button>}
                </div>
              ))}
            </ul>
            </div>
          </div>
        </motion.div>
        <motion.div whileHover={{
          scale: 1.1,
          boxShadow: "0px 0px 8px rgb(255,255,255)"
        }} drag dragConstraints={{left: -360, right: 360, top: -50, bottom: 50}} dragElastic={2}
        className="bg-gradient-to-b from-sky-300 to-purple-500  md:flex rounded-3xl p-1 shadow-lg shadow-purple-300">
          <div className="bg-zinc-950 p-10 rounded-[calc(1.5rem-0.25rem)] flex flex-col gap-4">
           <h1 className="font-bold text-purple-400 font-serif text-2xl border-b-2 border-indigo-600 h-10 ">Proactive</h1>
           <div className="">
            <ul>
              {proactiveTargets.map((target, index) => (
                <div key={`${index + 3} child`} className="flex border-b border-blue-200">
                { target.completed ? <li className="text-gray-500 font-serif  text-lg">{target.target_name} - Completed</li> : 
                    <motion.li whileHover={{scale: 1.6, originX:0 }} transition={{type: 'spring', stiffness: 200}} key={`${index + 1} child`} className=" w-40 font-serif text-purple-500 mb-2 text-lg">{target.target_name}</motion.li>}
                   {target.completed === false  && <motion.button key={`${index +2} child`} whileHover={{scale: 1.1, boxShadow: "0px 0px 8px rgb(255,255,255)"}} initial={{scale: 0.2} }animate={{ scale: 1, rotate: 180, opacity: 0.5}} transition={{repeat: Infinity, duration: 2, ease: "easeIn"}} onClick={() => handleProactiveTargetCompletion(target)} className=" self-center "><img className="w-5 h-5" src={target5} /></motion.button>}
                </div>
              ))}
            </ul>
            </div>
          </div>
        </motion.div>
        <motion.div whileHover={{
          scale: 1.1,
          boxShadow: "0px 0px 8px rgb(255,255,255)"
        }} drag dragConstraints={{left: -360, right: 120, top: -50, bottom: 50}} dragElastic={2}
        className="bg-gradient-to-b from-sky-300 to-purple-500  md:flex rounded-3xl p-1 shadow-lg shadow-purple-300">
          <div className="bg-zinc-950 p-10 rounded-[calc(1.5rem-0.25rem)] flex flex-col gap-4">
            <h1 className="font-bold text-purple-400 text-2xl border-b-2 font-serif border-indigo-600 h-10">Yearly</h1>
            <div className="">
            <ul>
              {yearlyTargets.map((target, index) => (
                <div key={`${index + 6} child`} className="flex border-b border-blue-200">
                { target.completed ? <li className="text-gray-500 font-serif  text-lg">{target.target_name} - Completed</li> : 
                    <motion.li whileHover={{scale: 1.6, originX:0 }} transition={{type: 'spring', stiffness: 200}} key={`${index + 1} child`} className=" w-40 font-serif text-purple-500 mb-2 text-lg">{target.target_name}</motion.li>}
                   {target.completed === false  && <motion.button key={`${index +2} child`} whileHover={{scale: 1.1, boxShadow: "0px 0px 8px rgb(255,255,255)"}} initial={{scale: 0.2} }animate={{ scale: 1, rotate: 180, opacity: 0.5}} transition={{repeat: Infinity, duration: 2, ease: "easeIn"}} onClick={() => handleYearlyTargetCompletion(target)} className=" self-center "><img className="w-5 h-5" src={target5} /></motion.button>}
                </div>
              ))}
            </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>
      </AnimatePresence>
    </div>
    
  )
}

export default ProfileBody