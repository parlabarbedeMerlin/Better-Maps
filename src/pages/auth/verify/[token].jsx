"use client"
import PopUp from "@/components/PopUp"
import Button from "@/components/inputs/buttons/Button"
import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"

const Verify = () => {
  const [popup, setPopup] = useState(false)
  const [message, setMessage] = useState("")
  const router = useRouter()
  const { token } = router.query
  const handleVerify = async () => {
    try {
      await axios.post("/api/auth/verifyMail", { token })
      router.push("/auth/login")
    }
    catch (error) {
      setPopup(true)
      setMessage(error.response.data.message)
    }
  }
  const handleClosePopup = () => {
    setPopup(false)
  }

  return (
    <>
      <div className="flex-1 bg-[#E5FFE5] flex justify-center items-center">
        <PopUp open={popup} onClose={handleClosePopup} message={message} success={false} clickBtn={handleClosePopup} btnText="Close" />
        <Button className="py-5" type={"button"} onClick={handleVerify}>
          Verify
        </Button>
      </div>
    </>
  )
}

export default Verify
