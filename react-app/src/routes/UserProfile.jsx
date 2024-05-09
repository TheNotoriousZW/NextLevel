import axios from 'axios'
import React ,{useState, useEffect }from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import ProfileNav from '../Components/ProfileNav'
import ProfileBody from '../Components/ProfileBody'
import Modal from '../Components/Modal'
import { set } from 'react-hook-form'
import { useLocalStorage } from '../useLocalStorage'
import eclass from '../assets/eclass.png'
import ProfileFooter from '../Components/ProfileFooter'
import WinModal from '../Components/WinModal'
import ProWinModal from '../Components/ProWinModal'
import YearWinModal from '../Components/YearWinModal'
import DailyChange from '../Components/DailyChange'
import ProactiveChange from '../Components/ProactiveChange'
import YearlyChange from '../Components/YearlyChange'
import bgimage from '../assets/bgimage.gif'
import bgimage2 from '../assets/bgimage2.gif'


const UserProfile = () => {

  const location = useLocation()
  const [showModal, setShowModal] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const [winModal, setWinModal] = useState(false)
  const [proWinModal, setProWinModal] = useState(false)
  const [yearWinModal, setYearWinModal] = useState(false)
  const [dailyChange, setDailyChange] = useState(false)
  const [dailyRebuild, setDailyRebuild] = useState(true)
  const [proactiveChange, setProactiveChange] = useState(false)
  const [proactiveRebuild, setProactiveRebuild] = useState(true)
  const [yearlyChange, setYearlyChange] = useState(false)
  const [yearlyRebuild, setYearlyRebuild] = useState(true)
  
  const {setItem: setPointsStore, getItem: getPoints} = useLocalStorage("points")
  const {setItem: setBonus, getItem: getBonus} = useLocalStorage("bonus")
  const {setItem: setProBonus, getItem: getProBonus} = useLocalStorage("bonus")
  const {setItem: setYearBonus, getItem: getYearBonus} = useLocalStorage("bonus")

  const access_token = location.state.token
  const navigate = useNavigate()

  const url = "http://127.0.0.1:8000/auth/current-user"

 
 
  const [user, setUser] = useState({})
  const [points, setPoints] = useState(getPoints())
 const [level, setLevel] = useState()
 const [userIcon, setUserIcon] = useState()

  useEffect(() => {
   

    async function fetchData() {
      try {


        const result = await axios.get(url, {
          headers: {
            'Authorization': ` Bearer ${access_token}`
          }
        })
        const data = result.data
        setUser((user) => data)
        setPointsStore(data.points)
        setLevel((level) => data.level)
        
        
        

      }
      catch(error){
        console.log(error)
        navigate("/login")
      }
      
      
      
    }

    
   fetchData()

 },[])

 
 const [dailyBonus, setDailyBonus] = useState(0)
const [proactiveBonus, setProactiveBonus] = useState(true)
const [yearlyBonus, setYearlyBonus] = useState(true)



    //rgb(11, 5, 24)


 document.body.style=`background-image: url(${bgimage})`
  return (

    
    <section className="flex flex-col gap-10 h-full w-full bg-black bg-opacity-45">
      <YearlyChange yearlyChange={yearlyChange} setYearlyChange={setYearlyChange} yearlyRebuild={yearlyRebuild} setYearlyRebuild={setYearlyRebuild}/>
      <ProactiveChange proactiveChange={proactiveChange} setProactiveChange={setProactiveChange} proactiveRebuild={proactiveRebuild} setProactiveRebuild={setProactiveRebuild}/>
      <DailyChange dailyChange={dailyChange} setDailyChange={setDailyChange}  dailyRebuild={dailyRebuild} setDailyRebuild={setDailyRebuild}/>
      <YearWinModal yearlyBonus={yearlyBonus} setYearlyBonus={setYearlyBonus} setYearBonus={setYearBonus} getYearBonus={getYearBonus} yearWinModal={yearWinModal} setYearWinModal={setYearWinModal} userIcon={userIcon} points={points} setPoints={setPoints} setPointsStore={setPointsStore} getPoints={getPoints} />
      <ProWinModal proWinModal={proWinModal} setProWinModal={setProWinModal} userIcon={userIcon} points={points} setPoints={setPoints} setPointsStore={setPointsStore} getPoints={getPoints} proactiveBonus={proactiveBonus} setProactiveBonus={setProactiveBonus} setProBonus={setProBonus} getProBonus={getProBonus}/>
      <WinModal winModal={winModal} setWinModal={setWinModal} userIcon={userIcon} setUser={setUserIcon} points={points} setPoints={setPoints} dailyBonus={dailyBonus} setDailyBonus={setDailyBonus} setPointsStore={setPointsStore} getPoints={getPoints} setBonus={setBonus} getBonus={getBonus} user={user} level={level}/>
      <Modal showModal={showModal} setShowModal={setShowModal} confirm={confirm} setConfirm={setConfirm}/>
      <ProfileNav user={user} points={points} setPoints={setPoints} level={level} setLevel={setLevel} userIcon={userIcon} setUserIcon={setUserIcon} setPointsStore={setPointsStore} getPoints={getPoints}/>
      <ProfileBody user={user} showModal={showModal} setShowModal={setShowModal} confirm={confirm} setConfirm={setConfirm} points={points} setPoints={setPoints} level={level} setLevel={setLevel} winModal={winModal} setWinModal={setWinModal} dailyBonus={dailyBonus} setDailyBonus={setDailyBonus} setPointsStore={setPointsStore} getPoints={getPoints} setBonus={setBonus} getBonus={getBonus}
      proWinModal={proWinModal} setProWinModal={setProWinModal} proactiveBonus={proactiveBonus} setProactiveBonus={setProactiveBonus} setProBonus={setProBonus} getProBonus={getProBonus} setYearBonus={setYearBonus} getYearBonus={getYearBonus} yearWinModal={yearWinModal} setYearWinModal={setYearWinModal} yearlyBonus={yearlyBonus} setYearlyBonus={setYearlyBonus}
      dailyRebuild={dailyRebuild} setDailyRebuild={setDailyRebuild} dailyChange={dailyChange} setDailyChange={setDailyChange} proactiveChange={proactiveChange} setProactiveChange={setProactiveChange} proactiveRebuild={proactiveRebuild} setProactiveRebuild={setProactiveRebuild} yearlyChange={yearlyChange} setYearlyChange={setYearlyChange} yearlyRebuild={yearlyRebuild} setYearlyRebuild={setYearlyRebuild}/>
      <ProfileFooter />
    </section>
    
    
    
    
   
  )
  
}

export default UserProfile
