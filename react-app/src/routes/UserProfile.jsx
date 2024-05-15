import axios from 'axios'
import React ,{useState, useEffect }from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import ProfileNav from '../Components/ProfileNav'
import ProfileBody from '../Components/ProfileBody'
import Modal from '../Components/Modal'
import { useLocalStorage } from '../useLocalStorage'
import ProfileFooter from '../Components/ProfileFooter'
import WinModal from '../Components/WinModal'
import ProWinModal from '../Components/ProWinModal'
import YearWinModal from '../Components/YearWinModal'
import LevelUp from '../Components/Levelup'
import DailyChange from '../Components/DailyChange'
import ProactiveChange from '../Components/ProactiveChange'
import YearlyChange from '../Components/YearlyChange'
import bgimage from '../assets/bgimage.gif'



const UserProfile = () => {
  
  const location = useLocation()
  const [showModal, setShowModal] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const [winModal, setWinModal] = useState(false)
  const [proWinModal, setProWinModal] = useState(false)
  const [yearWinModal, setYearWinModal] = useState(false)
  const [dailyChange, setDailyChange] = useState(false)
  const [proactiveChange, setProactiveChange] = useState(false)
  const [yearlyChange, setYearlyChange] = useState(false)
  const [levelUp, setLevelUp] = useState(false)
  const {setItem: setPointsStore, getItem: getPoints} = useLocalStorage("points")
  const {setItem: setUserStore, getItem: getUser} = useLocalStorage("user")
  const {setItem: setLevelStore, getItem: getLevel} = useLocalStorage("level")
  const [levelCount, setLevelCount] = useState(0)
  
  
  const access_token = location.state.token
  const navigate = useNavigate()

  const url = "http://127.0.0.1:8000/auth/current-user"

  const [user, setUser] = useState({})
  const [points, setPoints] = useState(getPoints())
  const [level, setLevel] = useState(getLevel())
  const [userIcon, setUserIcon] = useState()

  useEffect(() => {
   
    async function fetchData() {
      try {

        const result = await axios.get(url, {
          headers: {
            'Authorization': ` Bearer ${access_token}`
          }
        })
        const data = result.data;
        
        setUser((user) => user = result.data)
        setUserStore(data.username)
        setPointsStore(data.points)
        setLevelStore(data.level)
        
      }
      catch(error){
        console.log(error)
        navigate("/login")
      }
    }

   fetchData()

 },[])

    //rgb(11, 5, 24)

 document.body.style=`background-image: url(${bgimage})`
  return (

    <section className="flex flex-col gap-10 h-full w-full bg-black bg-[url('C:/Users/Dell 7390/OneDrive/Desktop/reactcode/react-app/src/assets/bgimage.gif')] bg-opacity-45">
      <LevelUp user={user} userIcon={userIcon} level={level} levelUp={levelUp} setLevelUp={setLevelUp} levelCount={levelCount} setLevelCount={setLevelCount}/>
      <YearlyChange yearlyChange={yearlyChange} setYearlyChange={setYearlyChange} getUser={getUser}/>
      <ProactiveChange proactiveChange={proactiveChange} setProactiveChange={setProactiveChange} getUser={getUser}/>
      <DailyChange dailyChange={dailyChange} setDailyChange={setDailyChange} getUser={getUser}/>
      <YearWinModal user={user} level={level} setPointsStore={setPointsStore}  yearWinModal={yearWinModal} setYearWinModal={setYearWinModal} userIcon={userIcon} points={points} setPoints={setPoints} getPoints={getPoints} />
      <ProWinModal user={user} level={level} setPoints={setPoints} getPoints={getPoints} proWinModal={proWinModal} setProWinModal={setProWinModal} userIcon={userIcon} points={points}  setPointsStore={setPointsStore} />
      <WinModal winModal={winModal} setWinModal={setWinModal} userIcon={userIcon} setUser={setUserIcon} points={points} setPoints={setPoints} setPointsStore={setPointsStore} getPoints={getPoints} user={user} level={level}/>
      <Modal showModal={showModal} setShowModal={setShowModal} confirm={confirm} setConfirm={setConfirm}/>
      <ProfileNav user={user} points={points} setPoints={setPoints} level={level} setLevel={setLevel} userIcon={userIcon} setUserIcon={setUserIcon} setPointsStore={setPointsStore} getPoints={getPoints}/>
      <ProfileBody user={user} showModal={showModal} setShowModal={setShowModal} confirm={confirm} setConfirm={setConfirm} points={points} setPoints={setPoints} level={level} setLevel={setLevel} winModal={winModal} setWinModal={setWinModal}  setPointsStore={setPointsStore} getPoints={getPoints} 
              proWinModal={proWinModal} setProWinModal={setProWinModal} yearWinModal={yearWinModal} setYearWinModal={setYearWinModal}
            setUserStore={setUserStore} setLevelStore={setLevelStore} getUser={getUser} getLevel={getLevel} levelCount={levelCount} setLevelCount={setLevelCount} levelUp={levelUp} setLevelUp={setLevelUp}/>
      <ProfileFooter />
    </section>
   
  )
}

export default UserProfile
