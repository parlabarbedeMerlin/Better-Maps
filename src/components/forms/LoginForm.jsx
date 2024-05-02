import PopUp from "@/components/PopUp"
import Button from "@/components/inputs/buttons/Button"
import TextField from "@/components/inputs/fields/TextField"
import { useConnectionContext } from "@/context/connection"
import loginSchema from "@/utils/schema/loginSchema"
import axios from "axios"
import clsx from "clsx"
import { Form, Formik } from "formik"
import { Dosis } from "next/font/google"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"

const fields = [
  { label: "Email", placeholder: "Email", id: "email", name: "email", type: "email" },
  { label: "Password", placeholder: "Password", id: "password", name: "password", type: "password" }
]
// eslint-disable-next-line new-cap
const dosis = Dosis({ subsets: ["latin"] })
const LoginForm = () => {
  const router = useRouter()
  const { setConnected } = useConnectionContext()
  const [popup, setPopup] = useState(false)
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState("")
  const handleClosePopup = () => {
    setPopup(false)

    if (success) {
      router.push("/")
    }
  }
  const initialValues = {
    email: "",
    password: ""
  }
  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      await loginSchema.validate(values, { abortEarly: false })
      await axios.post(`/api/auth/login`, values)
      setConnected(true)
      setPopup(true)
      setSuccess(true)
      setMessage("Login successful!")
    } catch (error) {
      if (error.name === "ValidationError") {
        error.inner.forEach(fieldError => {
          setFieldError(fieldError.path, fieldError.message)
        })
      } else {
        setPopup(true)
        setSuccess(false)
        setMessage(`\n${error.response.data.message}`)
      }
    }

    setSubmitting(false)
  }

  return (
    <>
      <PopUp open={popup} onClose={handleClosePopup} clickBtn={handleClosePopup} message={message} success={success} btnText={"Close"} />
      <Formik initialValues={initialValues} validationSchema={loginSchema} onSubmit={handleSubmit}>
        {({ values, errors, touched, handleChange, handleBlur }) => (<Form noValidate className="bg-white px-10 py-9 rounded-[35px] flex flex-col gap-6 items-center w-11/12 drop-shadow-2xl md-20 sm:my-0 md:max-w-96 md:w-11/12 sm:w-7/12">
          <h1 className={clsx(dosis.className, "text-4xl font-extrabold text-gray-800")}>Login</h1>
          {fields.map((field) => (<div key={field.id} className="flex flex-col w-full">
            <TextField id={field.id} name={field.name} type={field.type} placeholder={field.placeholder} value={values[field.name]} onChange={handleChange} onBlur={handleBlur} className={clsx("h-10 w-full p-2 my-1 rounded-xl border-2 outline-none transition-all duration-500", { "border-red-500": errors[field.name] && touched[field.name] })} />
            {errors[field.name] && touched[field.name] && (<span className="text-red-500">{errors[field.name]}</span>)}
          </div>))}
          <div>
            <p className="text-center">Don't have an account? <Link href="/auth/register" className="text-green-600 font-bold">Register</Link>.</p>
            <p className="text-center">Forgot your password? <Link href="/auth/forgotPassword" className="text-green-600 font-bold">Forgot Password</Link>.</p>
          </div>
          <Button className={clsx(dosis.className)} type="submit" variant="primary">Login</Button>
        </Form>)}
      </Formik>
    </>
  )
}

export default LoginForm
