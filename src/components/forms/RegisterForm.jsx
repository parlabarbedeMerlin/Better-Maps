"use client"
import PopUp from "@/components/PopUp"
import Button from "@/components/inputs/buttons/Button"
import TextFiled from "@/components/inputs/fields/TextField"
import registerSchema from "@/utils/schema/registerSchema"
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

    const formData = new FormData(e.target)
    const user = {
      email: formData.get("email"),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword")
    }

    try {
      await registerSchema.validate(user)
      const register = await axios.post("/api/auth/register",
        user)
      setPopup(true)
      setSuccess(true)
      setMessage(register.data.message)
    }
    catch (error) {
      setPopup(true)
      setSuccess(false)
      setMessage(error.errors[0] ?? error.response.data.message)
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
      <form className="bg-white px-10 py-9 rounded-[35px] flex flex-col gap-6 items-center w-11/12 drop-shadow-2xl md-20 sm:my-0 md:max-w-96 md:w-11/12 sm:w-7/12" onSubmit={handleSubmit}>
        <h1 className={clsx(dosis.className, "text-4xl font-extrabold")}>Register</h1>
        {fields.map((field) => (
          <TextFiled key={field.id} {...field} />
        ))}
        <p>Already have an account? <Link href="/auth/login" className="text-green-600 font-bold">Login</Link>.</p>
        <Button className={dosis.className} type="button" >Register</Button>
      </form>
    </>
  )
}

export default RegisterForm