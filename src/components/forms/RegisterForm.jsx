import PopUp from "@/components/PopUp"
import Button from "@/components/inputs/buttons/Button"
import TextField from "@/components/inputs/fields/TextField"
import registerSchema from "@/utils/schema/registerSchema"
import axios from "axios"
import clsx from "clsx"
import { Form, Formik } from "formik"
import { Dosis } from "next/font/google"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"

// eslint-disable-next-line new-cap
const dosis = Dosis({ subsets: ["latin"] })
const fields = [
  { label: "Email", placeholder: "Email", id: "email", name: "email", type: "email" },
  { label: "First Name", placeholder: "First Name", id: "firstName", name: "firstName" },
  { label: "Last Name", placeholder: "Last Name", id: "lastName", name: "lastName" },
  { label: "Password", placeholder: "Password", id: "password", name: "password", type: "password" },
  { label: "Confirm Password", placeholder: "Confirm Password", id: "confirmPassword", name: "confirmPassword", type: "password" }
]
const initialValues = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  confirmPassword: ""
}
const RegisterForm = () => {
  const [popup, setPopup] = useState(false)
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState("")
  const router = useRouter()
  const handleClosePopup = () => {
    setPopup(false)

    if (success) {
      router.push("/auth/login")
    }
  }
  const handleSubmit = async (values, { setFieldError }) => {
    try {
      const register = await axios.post(`${window.location.origin}/api/auth/register`, values)
      setPopup(true)
      setSuccess(true)
      setMessage(register.data.message)
    } catch (error) {
      setPopup(true)
      setSuccess(false)
      setMessage(error.response.data.message)

      if (error.response && error.response.data && error.response.data.errors) {
        error.response.data.errors.forEach(({ field, msg }) => {
          setFieldError(field, msg)
        })
      }
    }
  }

  return (
    <>
      <PopUp open={popup} onClose={handleClosePopup} clickBtn={handleClosePopup} message={message} success={success} btnText={"Login"} />
      <Formik initialValues={initialValues} validationSchema={registerSchema} onSubmit={handleSubmit}>
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form noValidate className="bg-white px-10 py-9 rounded-[35px] flex flex-col gap-6 items-center w-11/12 drop-shadow-2xl md-20 sm:my-0 md:max-w-96 md:w-11/12 sm:w-7/12">
            <h1 className={clsx(dosis.className, "text-4xl font-extrabold text-gray-800")}>Register</h1>
            {fields.map((field) => (<div key={field.id} className="flex flex-col w-full">
              <TextField id={field.id} name={field.name} type={field.type} placeholder={field.placeholder} value={values[field.name]} onChange={handleChange} onBlur={handleBlur} className={clsx("h-10 w-full p-2 my-1 rounded-xl border-2 outline-none transition-all duration-500", {
                "border-red-500": errors[field.name] && touched[field.name]
              })}
              />
              {errors[field.name] && touched[field.name] && (<span className="text-red-500">{errors[field.name]}</span>)}
            </div>))}
            <p>Already have an account? <Link href="/auth/login" className="text-green-600 font-bold">Login</Link>.</p>
            <Button className={dosis.className} type="submit">Register</Button>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default RegisterForm
