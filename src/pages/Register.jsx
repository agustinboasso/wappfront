import React from 'react'
import RegisterForm from "../components/auth/RegisterForm"

const Register = () => {
  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px] overflow-hidden">
      {/*Container */}
      <div className="flex w-[1600px] mx-auto h-full">
        {/** Registers form */}
        <RegisterForm/>
      </div>
    </div>
  )
}

export default Register