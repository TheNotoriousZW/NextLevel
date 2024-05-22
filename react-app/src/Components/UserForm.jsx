import React, {useState, useEffect} from 'react'
import {useForm} from 'react-hook-form'
import axios, { AxiosError } from 'axios'
import {Navigate} from 'react-router-dom'

const UserForm = () => {

  const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm();

  

  const [username, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [age, setAge] = useState(14)
  const [gender, setGender] = useState("")
  const [password, setPassword] = useState("")

  const user = {username, age, gender, email, password}
  
 
  
  const onSubmit = async () => {
    let h2 = document.getElementById("register")
    

    try {
      const result = await axios.post("http://127.0.0.1:8000/auth/register", user);
      h2.innerHTML = "Register"
      h2.classList.replace('text-red-400','text-blue-400')
    
    
    
    
    } catch(AxiosError){
     console.log(AxiosError.response.data['detail'])
     h2.innerHTML = `${AxiosError.response.data['detail']}`
     h2.classList.replace('text-blue-400', 'text-red-400')
    }
    
    setUserName("")
    setPassword("")
    setEmail("")
    setAge(13)


  }

  return (
   
    <div id="register-card" className="self-center flex ring-1 hover:ring-blue-400 border transition-all rounded-xl p-10 mt-4 mb-4 shadow-lg shadow-blue-300 bg-slate-300">
      <form onSubmit={handleSubmit(onSubmit)} >

        <div className='flex flex-col gap-2'>
        <h2 id="register" className="self-center font-bold text-2xl text-blue-400">Register</h2>
        <input className="border ring-2 ring-blue-300 rounded-xl p-2 focus:outline-none focus:border-blue-400 focus:shadow-blue-300 focus:shadow-lg 
        active: text-red-300 focus:bg-gray-200 focus:font-normal font-bold " {...register("username", {required: true,
        validate: (value) => value.length > 0})}  type="text" placeholder="Username" onChange={(e) => setUserName(e.target.value)} />
        {errors.username && <div className="flex justify-center animate-pulse text-red-700">Something went wrong</div>}
        
        <input className="border ring-2 ring-blue-300 rounded-xl p-2 focus:outline-none focus:border-blue-400 focus:shadow-blue-300 focus:shadow-lg 
        active: text-red-300 focus:bg-gray-200 focus:font-normal font-bold " {...register("password", {required: true,
        validate: (value) => value.length > 0})}  type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        {errors.password && <div className="flex justify-center animate-pulse text-red-700">Something went wrong</div>}

        <input className="border ring-2 mt-1 ring-blue-300 rounded-xl p-2 focus:outline-none focus:border-blue-400 focus:shadow-blue-300 focus:shadow-lg 
        active: text-red-300 focus:bg-gray-200 focus:font-normal font-bold " {...register("email", {required: true,
        validate: (value) => value.length > 0 && value.includes('@')})}  type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        {errors.email && <div className="flex justify-center animate-pulse text-red-700">Something went wrong</div>}
        
        <div className="flex justify-center gap-3">
            <label htmlFor='age' className="text-gray-400 font-bold">age:</label>
            <input id="age" className='w-10 ring-2 ring-blue-300 hover:w-40  focus-within:text-red-300 border self-center rounded-md p-2 focus:outline-none focus:border focus:border-blue-400
            focus:shadow-xl focus:shadow-blue-300 focus:text-red-400 transition-all focus:bg-gray-200'{...register("age", {required: true,
            validate: (value) => value > 12})} type="number" placeholder="age" onChange={(e) => setAge(Number(e.target.value))} />
            {errors.age && <div className="font-bold shadow-sm border-5">you must be older than 12</div>}
        </div>

        <div className="flex text-white font-bold mt-2 mb-2 justify-evenly ">
          <div className="border ring-2 ring-blue-300 focus-within:font-normal focus-within:flex focus-within:flex-col focus-within:border-none rounded-full p-2 focus-within:ring-2 focus-within:shadow-xl focus-within:shadow-blue-300 focus-within:ring-blue-400 focus-within:bg-blue-400 ">
                <button onClick={() => setGender("male")}>male</button>
          </div>
          
          <div className="border ring-2 ring-blue-300 focus-within:font-normal focus-within:flex focus-within:flex-col focus-within:border-none rounded-full p-2 focus-within:ring-2 focus-within:shadow-xl focus-within:shadow-blue-300 focus-within:ring-blue-400 focus-within:bg-blue-400 active:bg-blue-400">
          <button onClick={() => setGender("female")}>female</button>
          </div>
        </div>
         
        <button className={`border hover:bg-blue-400 focus:transition-all  focus:bg-blue-500 rounded-lg w-40 self-center h-8 font-bold bg-blue-300 outline-none text-gray-300 ring-2 ring-blue-400 shadow-lg shadow-blue-300 `} disabled={isSubmitting} type='submit'>{
          isSubmitting ? "Loading..." : "Submit"
        }</button>
       </div>
      </form>
    </div>
  )
}

export default UserForm
