import React from 'react'
import DashBoard from '../Components/DashBoard'
import LoginForm from '../Components/LoginForm'

const Login = () => {
  return (
    <section className="flex flex-col gap-10">
      <DashBoard />
      <LoginForm />
    </section>
  )
}

export default Login
