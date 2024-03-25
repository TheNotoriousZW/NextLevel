import axios from 'axios'
import React ,{useState, useEffect, useContext}from 'react'
import {useLocation} from 'react-router-dom'
import ProfileNav from '../Components/ProfileNav'

const UserProfile = () => {

  const location = useLocation()
  

  const access_token = location.state.token
  

  const url = "http://127.0.0.1:8000/auth/current-user"

 
 
  const [user, setUser] = useState({})

  useEffect(() => {
   
    async function fetchData() {
      const result = await axios.get(url, {
        headers: {
          'Authorization': ` Bearer ${access_token}`
        }
      })
      const data = result.data
      setUser((user) => data)
    }

    
   fetchData()

 },[])

  return (
    <section className="flex flex-col gap-10">
      <ProfileNav/>
      hello {user.username}
    </section>
  )
  
}

export default UserProfile
