import  {useState, useEffect, createContext, useContext} from 'react'
import {useForm} from 'react-hook-form'
import axios, { AxiosError } from 'axios'
import {NavLink, useNavigate} from 'react-router-dom'






const LoginForm = () => {
  
  

  const navigate = useNavigate();

  const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm();

  

  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [token, setToken] = useState({})

  

  const user = {username, password}
  
  
  const formData = new FormData()
  const onSubmit = async () => {
    let h2 = document.getElementById("login")
    
    
    
    formData.append("username", username);
    formData.append("password", password);
    
    try {
      const result = await axios.post("http://127.0.0.1:8000/auth/login", formData
       
          );
            
            const access_token = result.data.access_token 
            setToken(access_token)
            
            if (token) {
              
              navigate("/", {state: {'token': access_token}});
              
            }
            else{
              console.log("?")
            }
            
            
            h2.innerHTML = "Login"
            h2.classList.replace('text-red-400','text-blue-400')
            
            
            
            
            } catch(AxiosError){
            console.log(AxiosError.response.data['detail'])
            h2.innerHTML = `Try again`
            h2.classList.replace('text-blue-400', 'text-red-400')
            }
            
            setUserName("")
            setPassword("")
          
            
            

  }

  

  return (

    
   
    <div className="self-center flex ring-1 hover:ring-blue-400 border transition-all rounded-xl p-10 mt-4 mb-4 shadow-lg shadow-blue-300 bg-slate-300">
      <form id="loginform" onSubmit={handleSubmit(onSubmit)} >

        <div className='flex flex-col gap-2'>
        <h2 id="login" className="self-center font-bold text-2xl text-blue-400">Login</h2>
        <input className="border ring-2 ring-blue-300 rounded-xl p-2 focus:outline-none focus:border-blue-400 focus:shadow-blue-300 focus:shadow-lg 
        active: text-red-300 focus:bg-gray-200 focus:font-normal font-bold " {...register("username", {required: true,
        validate: (value) => value.length > 0})}  type="text" placeholder="Username" value={username} onChange={(e) => setUserName(e.target.value)} />
        {errors.username && <div className="flex justify-center animate-pulse text-red-700">Something went wrong</div>}
        
        <input className="border ring-2 ring-blue-300 rounded-xl p-2 focus:outline-none focus:border-blue-400 focus:shadow-blue-300 focus:shadow-lg 
        active: text-red-300 focus:bg-gray-200 focus:font-normal font-bold " {...register("password", {required: true,
        validate: (value) => value.length > 0})}  type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {errors.password && <div className="flex justify-center animate-pulse text-red-700">Something went wrong</div>}

         
       
        <button className={`border hover:bg-blue-400 focus:transition-all  focus:bg-blue-500 rounded-lg w-40 self-center h-8 font-bold bg-blue-300 outline-none text-gray-300 ring-2 ring-blue-400 shadow-lg shadow-blue-300 `} disabled={isSubmitting} type='submit'>{
          isSubmitting ? "Loading..." : "Submit"
        }</button>
       </div>
      </form>
     
      </div>

      
  )
}



export default LoginForm

