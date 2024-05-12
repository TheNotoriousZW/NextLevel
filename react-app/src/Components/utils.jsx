import axios from 'axios'

export function giveBonus(list, url, modal, length){
  let bonus = 0
  
  list.forEach((target) => {
    bonus += target.bonus;
    target.bonus = 0
    try {
      axios.put(url,{

        target_name: target.target_name,
        start_time: target.start_time,
        completed: target.completed,
        consistency: target.consistency,
        bonus: target.bonus,
        points: target.points

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


export function targetUpdate(name, url, start_time, completed, consistency, bonus, points){
  try {
    axios.put(url,{

      target_name: name,
      start_time: start_time,
      completed: completed,
      consistency: consistency,
      bonus: bonus,
      points: points

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

export async function targetCreate(target, url, targetset, frontset, list, points){

  try {
    const response = await axios.post(url,{

      username:     target.username,
      targetname:   target.name,
      start_time:   target.startTime,
      completed:    target.completed,
      consistency:  target.consistency,
      points:       points,
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
    if( (Date.now() - new Date(list[0].origin)) / time >= 1){

      setmodel(true)
      
    }
  }
}

export function delDt(url){
  
  axios.delete(url)

}

export async function fetchData( url, setList, setFront){

  try{

    const response = await axios.get(url);
    setList(response.data)
    setFront(response.data)
  }
  catch{
    console.log(error)
  }
  
};