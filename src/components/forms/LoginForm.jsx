"use client"
import PopUp from "@/components/PopUp"
import Button from "@/components/inputs/buttons/Button"
import TextFiled from "@/components/inputs/fields/TextField"
import { useConnectionContext } from "@/context/connection"
import loginSchema from "@/utils/schema/loginSchema"
import axios from "axios"
import clsx from "clsx"
import { Dosis } from "next/font/google"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"


// eslint-disable-next-line new-cap
const dosis = Dosis({ subsets: ["latin"] })
const RegisterForm = () => {
  const [popup, setPopup] = useState(false)
  const [message, setMessage] = useState("")
  const router = useRouter()
  const { setConnected } = useConnectionContext()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const connection = {
      email: formData.get("email"),
      password: formData.get("password")
    }

    try {
      await loginSchema.validate(connection)
      await axios.post("/api/auth/login", connection)
      setConnected(true)

      router.push("/")
    }
    catch (error) {
      setPopup(true)
      setMessage(error.errors ?? error.response.data.message)
    }
  }
  const handleClosePopup = () => {
    setPopup(false)
  }

  return (
    <>
      <PopUp onClose={handleClosePopup} open={popup} message={message} success={false} btnText="Close" />
      <form className="bg-white px-10 py-9 rounded-[35px] flex flex-col gap-6 items-center w-11/12 md-20 sm:my-0 md:max-w-96 md:w-11/12 sm:w-7/12 drop-shadow-2xl" onSubmit={handleSubmit}>
        <h1 className={clsx(dosis.className, "text-5xl font-black text-gray-800")}>Login</h1>
        <TextFiled id="email" type="email" placeholder="Email" />
        <TextFiled id="password" type="password" placeholder="Password" />
        <div>
          <p className="text-center">
            Don't have an account? <Link href="/auth/register" className="text-green-600 font-bold">Register</Link>.
          </p>
          <p className="text-center">
            Forgot your password? <Link href="/auth/forgotPassword" className="text-green-600 font-bold">Forgot Password</Link>.
          </p>
        </div>
        <Button className={clsx(dosis.className)} type={"button"} variant="primary">
          Login
        </Button>
      </form>
    </>
  )
}

export default RegisterForm