"use client"
import PopUp from "@/components/PopUp"
import Button from "@/components/inputs/buttons/Button"
import TextFiled from "@/components/inputs/fields/TextField"
import axios from "axios"
import clsx from "clsx"
import { Dosis } from "next/font/google"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"


// eslint-disable-next-line new-cap
const dosis = Dosis({ subsets: ["latin"] })
const fields = [
  { placeholder: "Email", id: "email" },
  { placeholder: "First Name", id: "firstName" },
  { placeholder: "Last Name", id: "lastName" },
  { placeholder: "Password", id: "password", type: "password" },
  { placeholder: "Confirm Password", id: "confirmPassword", type: "password" }

]
const RegisterForm = () => {
  const [popup, setPopup] = useState(false)
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState("")
  const router = useRouter()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const user = {
      email: document.getElementById("email").value,
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      password: document.getElementById("password").value,
      confirmPassword: document.getElementById("confirmPassword").value
    }

    try {
      const register = await axios.post("/api/auth/register",
        user)
      setPopup(true)
      setSuccess(true)
      setMessage(register.data.message)
    }
    catch (error) {
      setSuccess(false)
      setPopup(true)
      setMessage(error.response.data.message)
    }
  }
  const handleClosePopup = () => {
    setPopup(false)

    if (success) {
      router.push("/auth/login")
    }
  }

  return (
    <>
      <PopUp open={popup} onClose={handleClosePopup} clickBtn={handleClosePopup} message={message} success={success} btnText={"Login"} />
      <form className="bg-white px-10 py-9 rounded-[35px] flex flex-col gap-6 items-center w-11/12 drop-shadow-2xl md-20 sm:my-0 md:max-w-96 md:w-11/12 sm:w-7/12">
        <h1 className={clsx(dosis.className, "text-4xl font-extrabold")}>Register</h1>
        {fields.map((field) => (
          <TextFiled key={field.id} {...field} />
        ))}
        <p>Already have an account? <Link href="/auth/login" className="text-green-600 font-bold">Login</Link>.</p>
        <Button className={dosis.className} type="button" onClick={handleSubmit} >Register</Button>
      </form>
    </>
  )
}

export default RegisterForm