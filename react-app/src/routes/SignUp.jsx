import React from 'react'
import UserForm from '../Components/UserForm'
import DashBoard from '../Components/DashBoard'

const SignUp = () => {
  return (
    <section className="flex flex-col gap-10">
      <DashBoard />
      {<UserForm />}
      </section>
  )
}

export default SignUp
