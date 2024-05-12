import axios from 'axios'

export function giveBonus(list, modal, length){
  let bonus = 0
  
  list.forEach((target) => {
    bonus += target.bonus;
    target.bonus = 0
    try {
      axios.put('http://127.0.0.1:8000/Dt',{

        target_name: target.target_name,
        start_time: target.start_time,
        completed: target.completed,
        consistency: target.consistency,
        bonus: target.bonus,
        dailypoints: target.dailypoints

      })
      

     
    }
    catch(error)
    {
     console.log(error)
    }})

  if(bonus >= length){
  
  modal(true)
  
}
console.log('NO bonus')
};

export function userUpdate(user, points, level, pointStore, pointset, add, getter){
  try {
    axios.put('http://127.0.0.1:8000/user-track', {username: user, points: points + add, level: level})
     pointStore(points + add)
     pointset(getter())
     
  }
  catch(error)
  {
   console.log(error)
  }
}


export function targetUpdate(name, start_time, completed, consistency, bonus, dailypoints){
  try {
    axios.put('http://127.0.0.1:8000/Dt',{

      target_name: name,
      start_time: start_time,
      completed: completed,
      consistency: consistency,
      bonus: bonus,
      dailypoints: dailypoints

    })
    

   
  }
  catch(error)
  {
   console.log(error)
  }
  
  
}
export function levelTrack(points, levelset){
  if(points > 29999 && points < 45000){
    levelset('D class')
   
  }
  else if(points > 45000 && points < 70000){
    
    levelset("C class")
    
  }
  else if(points > 70000 && points < 100000){
    
    levelset('B class')
    
  }
  else if (points > 100000 && points < 156000){
    
    levelset("A class")
    
  }
  else if (points > 156000) {
    
   levelset("S class")
   
  }
  else if(points < 29999){
    levelset("E class")
  }
}

export async function targetCreate(target, targetset, frontset, list){

  try {
    const response = await axios.post('http://127.0.0.1:8000/userDt',{

      username:     target.username,
      targetname:   target.name,
      start_time:   target.startTime,
      completed:    target.completed,
      consistency:  target.consistency,
      dailypoints:  target.dailyPoints,
      origin:       target.origin,
      bonus:        target.bonus
      

    })
    frontset([...list, response.data])
    targetset("")
  }
  catch(error)
  {
   console.log(error)
  }

}

export function targetChange(list, num, time, setmodel){

  if(list.length >= num){
    if( (Date.now() - new Date(list[0].origin)) / time >= 0.001){

      setmodel(true)
      
    }
  }
}

export function delDt(username){
  
  axios.delete(`http://127.0.0.1:8000/rmDt/${username}`)

}

export async function fetchData(user, setList, setFront){

  try{

    const response = await axios.get(`http://127.0.0.1:8000/userDtarg?username=${user}`);
    setList(response.data)
    setFront(response.data)
  }
  catch{
    console.log(error)
  }
  
};