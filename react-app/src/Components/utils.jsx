import axios from 'axios'
import { set } from 'react-hook-form';

export function giveBonus(list, url, modal, length){
  let bonus = 0
  
  list.forEach((target) => {
    bonus += target.bonus;
    target.bonus = 0
    try {
      axios.put(url,{

        id: target.id,
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


export function targetUpdate(name, id, url, start_time, completed, consistency, bonus, points){
  try {
    axios.put(url,{

      id: id,
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
export function levelTrack(points, levelstore, levelset, levelget){
  
    if(points > 29999 && points < 45000){
      levelstore('D class')
      levelset(levelget())
      
    }
    else if(points > 45000 && points < 70000){
      
      levelstore("C class")
      levelset(levelget())
      
    }
    else if(points > 70000 && points < 100000){
      
      levelstore('B class')
      levelset(levelget())

    }
    else if (points > 100000 && points < 156000){
      
      levelstore("A class")
     levelset(levelget())

    }
    else if (points > 156000) {
      
     levelstore("S class")
     levelset(levelget())

    }
    else if(points < 29999){

      levelstore("E class")
      levelset(levelget())

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
  
   

  if(typeof setmodel === 'function' && list.length >= num){
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



