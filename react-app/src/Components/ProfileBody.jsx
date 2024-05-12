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
  
  
  // Time Management
  const oneDay = 1000 * 60 * 60 * 24
  const oneHour = 1000 * 60 * 60
  const oneWeek = oneDay * 7
  const oneYear = oneDay * 365

  //Targets and point system
  
  const [target, setTarget] = useState({
    username: user,
    name: "",
    startTime: new Date(),
    completed: false,
    EndTime: undefined,
    consistency: 0.0,
    dailyPoints: 5,
    proactivePoints: 50,
    yearlyPoints: 1500,
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

    fetchData(user, setDailyTargets, setDailyTargetsFront);

  },[user]);
  
  
  useEffect(() => {
  
    props.setLevel(getLevel())
    props.setPoints(props.getPoints())

  })
 

useEffect(() => {

  levelTrack(props.points, setLevel)
 
})
  
  // Handle target functionality

  
 //Proactive Targets
 /*useEffect(() => {
  proactiveTargets.forEach((target) => {
    if ((  Date.now() - new Date(target.startTime)) / oneWeek >= 0.0001 && target.completed){
      target.startTime = Date.now()
      target.completed = false
      target.consistency += 0.5
      setTarget({...target})
      setProactiveTargets([...proactiveTargets])
      if ( target.consistency >= 1){
        target.proactivePoints =  (target.consistency * 2) + target.proactivePoints
        target.proactivePoints = Math.floor(target.proactivePoints)
        setTarget({...target})
        setProactiveTargets([...proactiveTargets])
      }
      
      

    }
    else if((  Date.now() - new Date(target.startTime)) / oneWeek >= 0.001 && target.completed === false){
      props.setPointsStore(props.getPoints() - 50)
      target.startTime = Date.now()
      target.completed = false
      target.EndTime = null
      target.consistency -= 1
      setTarget({...target})
      setProactiveTargets([...proactiveTargets])
      if (target.consistency < 0){
        target.consistency = 0
        target.proactivePoints = 50
        setTarget({...target})
        setProactiveTargets([...proactiveTargets])
      }
    }
  })

 
},[proactiveTargets])

//yearly targets
useEffect(() => {
  yearlyTargets.forEach((target) => {
    if ((  Date.now() - new Date(target.startTime)) / oneYear >= 0.000001 && target.completed){
      target.startTime = Date.now()
      target.completed = false
      target.consistency += 5
      setTarget({...target})
      setYearlyTargets([...yearlyTargets])
      if ( target.consistency >= 1){
        target.yearlyPoints =  (target.consistency * 2) + target.yearlyPoints
        target.yearlyPoints = Math.floor(target.yearlyPoints)
        setTarget({...target})
        setYearlyTargets([...yearlyTargets])
      }
      
      

    }
    else if((  Date.now() - new Date(target.startTime)) / oneYear >= 0.000001 && target.completed === false){
      props.setPointsStore(props.getPoints() - 1000)
      target.startTime = Date.now()
      target.completed = false
      target.EndTime = null
      target.consistency -= 5
      setTarget({...target})
      setYearlyTargets([...yearlyTargets])
      if (target.consistency < 0){
        target.consistency = 0
        target.yearlyPoints = 1500
        setTarget({...target})
        setYearlyTargets([...yearlyTargets])
      }
    }
  })
  
},[yearlyTargets])   */  

//Bonus Points

useEffect(() => {

 if(proactiveTargets.length >= 3){
  if(proactiveTargets.every((target) => target.completed) && props.proactiveBonus === false){
    props.setProWinModal(true)
   }
   if(proactiveTargets.some((target) => target.completed) === false){
    props.setProactiveBonus(false)
   }
 } 
  
  
})
 
useEffect(() => {

if(yearlyTargets.length >= 3){
  if(yearlyTargets.every((target) => target.completed) && props.yearlyBonus === false){
    props.setYearWinModal(true)
   }
   if(yearlyTargets.some((target) => target.completed) === false){
    props.setYearlyBonus(false)
   }
}
  
  
})

  

  
  //HANDLE INPUTS
  function handleTargetChange(e, id){
    document.getElementById(id).classList.remove("hidden")
    if(e.target.value.length > 0){

      setTarget({...target, username: user, name: e.target.value, startTime: Date.now(), completed: false, consistency: 0.0, dailyPoints: 5, proactivePoints: 50, yearlyPoints: 1500, origin: new Date(), bonus: 0})
      
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


      if (props.confirm){
        
        document.getElementById("dailytarget").value = ""
        document.getElementById("dtsubmit").classList.add("hidden")

        targetCreate(target, setTarget, setDailyTargetsFront, dailyTargets)
        
           }
      else {
            
            setTarget("")
            document.getElementById("dailytarget").value = ""
            document.getElementById("dtsubmit").classList.add("hidden")
           }
      } 
      
  
  
  function handleProactiveTargetButton(){
    if (props.confirm){
      setProactiveTargetsFront([...proactiveTargets, target])
      setProactiveTargets([...proactiveTargets, target])
      setTarget("")
      document.getElementById("proactivetarget").value = ""
      document.getElementById("ptsubmit").classList.add("hidden")
      
    }
    else {
          
          setTarget("")
          document.getElementById("proactivetarget").value = ""
          document.getElementById("ptsubmit").classList.add("hidden")
         }
  }

  function handleYearlyTargetButton(){
    if (props.confirm){
      setYearlyTargetsFront([...yearlyTargets, target])
      setYearlyTargets([...yearlyTargets, target])
      setTarget("")
      document.getElementById("yearlytarget").value = ""
      document.getElementById("ysubmit").classList.add("hidden")
      
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
      giveBonus(dailyTargets, props.setWinModal, 6)
  }
},[props.points])


  async function handleDailyTargetCompletion(target){
    target.end_time = Date.now()
    target.start_time = new Date(target.start_time)
  
    const timedifference = (target.end_time - target.start_time)
    const days = timedifference / oneDay
    
    if (days < 0.1) {
      
      target.consistency += 1;
      target.completed = true;
      target.bonus += 1;
      
      
      userUpdate(user, props.points, props.level, props.setPointsStore, props.setPoints, target.dailypoints, props.getPoints)

      targetUpdate(target.target_name, target.start_time, target.completed, target.consistency, target.bonus, target.dailypoints)
      
    
    }
  }

  function handleProactiveTargetCompletion(target){
    target.EndTime = Date.now()
    target.startTime = new Date(target.startTime)

    const timedifference = (target.EndTime - target.startTime)
    const weeks = timedifference / oneWeek
    if (weeks < 1) {
      
      props.setPointsStore(props.points + target.proactivePoints)
      target.completed = true
      setTarget({...target})
      setProactiveTargets([...proactiveTargets])
      
    }
  }

  function handleYearlyTargetCompletion(target){
    target.EndTime = Date.now()
    target.startTime = new Date(target.startTime)

    const timedifference = (target.EndTime - target.startTime)
    const years = timedifference / oneYear
    if (years < 1) {
      
      props.setPointsStore(props.points + target.yearlyPoints)
      target.completed = true
      setTarget({...target})
      setYearlyTargets([...yearlyTargets])
      
    }
  }
 
//Handle Target Change 
useEffect(() => {
  
   targetChange(dailyTargets, 5, oneDay, props.setDailyChange,)
})

useEffect(() => {
  
  if(proactiveTargets.length >= 3){
    if( (Date.now() - new Date(proactiveTargets[0].origin)) / oneWeek >= 0.0001){
      props.setProactiveChange(true)
      proactiveTargets[0].origin = Date.now()
      setProactiveTargets([...proactiveTargets])
    }
  }
  if(!props.proactiveRebuild){
    setProactiveTargets([])
    props.setProactiveRebuild(true)
  }
})


useEffect(() => {
  
  if(yearlyTargets.length >= 3){
    if( (Date.now() - new Date(yearlyTargets[0].origin)) / oneWeek >= 0.0001){
      props.setYearlyChange(true)
      yearlyTargets[0].origin = Date.now()
      setYearlyTargets([...yearlyTargets])
    }
  }
  if(!props.yearlyRebuild){
    setYearlyTargets([])
    props.setYearlyRebuild(true)
  }
})

  // Ui logic
  return (
    
    <div className="flex justify-center flex-col gap-2  ">
      <div className="flex gap-8 self-center">
        <AnimatePresence >
          
        <div key="1" className="flex gap-1">
            <motion.input  id="dailytarget" placeholder="DailyTarget" initial={{scale: 0}} animate={{scale: 1}} transition={{delay: .5}} exit={{scale: 0}} onChange={(e) => handleTargetChange(e, "dtsubmit")} required minLength={4} className={`rounded-md border h-2 p-4  outline-none ring-2 focus:bg-black ring-indigo-500 text-purple-400 text-md font-bold font-serif shadow-md bg-slate-800 shadow-purple-500 ${dailyTargets.length >= 6 && "hidden"}`}/>
            <motion.button id="dtsubmit" whileHover={{scale: 1.1}} onClick={() => handleDailyTargetButton()} className="h-10 w-10 hidden"><img src={target5}/></motion.button>
        </div>
        <div key="3" className='flex gap-1'>
          <motion.input id="proactivetarget" placeholder="ProactiveTarget"  initial={{scale: 0}} animate={{scale: 1}} transition={{delay: .5}} exit={{scale: 0}} onChange={(e) => handleTargetChange(e, "ptsubmit")} required minLength={4}  className={`rounded-md border h-2 p-4  outline-none ring-2 focus:bg-black ring-indigo-500 text-purple-400 text-md font-bold font-serif shadow-md bg-slate-800 shadow-purple-500 ${proactiveTargets.length >= 3 && "hidden"}`}/>
            <button id="ptsubmit" onClick={() => handleProactiveTargetButton()} className="h-10 w-10 hidden"><img src={target5}/></button>
          
        </div>
        <div key="2" className='flex gap-1'>
          <motion.input placeholder="YearlyTarget" id="yearlytarget"  initial={{scale: 0}} animate={{scale: 1}} transition={{delay: .5}} exit={{scale: 0}} onChange={(e) => handleTargetChange(e, "ysubmit")} required minLength={4} className={`rounded-md border h-2 p-4  outline-none ring-2 focus:bg-black ring-indigo-500 text-purple-400 text-md font-bold font-serif shadow-md bg-slate-800 shadow-purple-500 ${yearlyTargets.length >= 3 && "hidden"}`}/>
            <button id="ysubmit" onClick={() => handleYearlyTargetButton()} className="h-10 w-10 hidden"><img src={target5}/></button>
          
        </div>
        </AnimatePresence>
      </div>
      <AnimatePresence>
      <motion.div initial={{y: -200}} animate={{y:0}}  transition={{ type: "spring", stiffness: 200}} className="flex justify-around h-[350px] gap-1 mt-5">
        <motion.div whileHover={{
          scale: 1.1,
          boxShadow: "0px 0px 8px rgb(255,255,255)"
        }} drag dragConstraints={{left: -120, right: 360, top: -50, bottom: 50}} dragElastic={2} className="bg-gradient-to-b from-sky-300 to-purple-500  flex rounded-3xl p-1 shadow-lg shadow-purple-300 ">
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
        className="bg-gradient-to-b from-sky-300 to-purple-500  flex rounded-3xl p-1 shadow-lg shadow-purple-300">
          <div className="bg-zinc-950 p-10 rounded-[calc(1.5rem-0.25rem)] flex flex-col gap-4">
           <h1 className="font-bold text-purple-400 font-serif text-xl border-b-2 border-indigo-600 h-10 ">Proactive</h1>
           <div className="">
            <ul>
              {proactiveTargets.map((target, index) => (
                <div key={`${index + 3} child`} className="flex border-b border-blue-200">
                { target.completed ? <li className="text-gray-500 font-serif  text-lg">{target.name} - Completed</li> : 
                    <motion.li whileHover={{scale: 1.6, originX:0 }} transition={{type: 'spring', stiffness: 200}} key={`${index + 1} child`} className=" w-40 font-serif text-purple-500 mb-2 text-lg">{target.name}</motion.li>}
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
        className="bg-gradient-to-b from-sky-300 to-purple-500  flex rounded-3xl p-1 shadow-lg shadow-purple-300">
          <div className="bg-zinc-950 p-10 rounded-[calc(1.5rem-0.25rem)] flex flex-col gap-4">
            <h1 className="font-bold text-purple-400 text-xl border-b-2 font-serif border-indigo-600 h-10">Yearly</h1>
            <div className="">
            <ul>
              {yearlyTargets.map((target, index) => (
                <div key={`${index + 6} child`} className="flex border-b border-blue-200">
                { target.completed ? <li className="text-gray-500 font-serif  text-lg">{target.name} - Completed</li> : 
                    <motion.li whileHover={{scale: 1.6, originX:0 }} transition={{type: 'spring', stiffness: 200}} key={`${index + 1} child`} className=" w-40 font-serif text-purple-500 mb-2 text-lg">{target.name}</motion.li>}
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