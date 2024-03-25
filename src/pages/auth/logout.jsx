import { useConnectionContext } from "@/context/connection"
import Cookies from "js-cookie"
import { useRouter } from "next/router"
import { useEffect } from "react"

const Logout = () => {
  const router = useRouter()
  const { setConnected } = useConnectionContext()
  useEffect(() => () => {
    Cookies.remove("token")
    setConnected(false)
    router.push("/")
  }
  )

  return (
    <div>
      <h1>Logout</h1>
    </div>
  )
}

export default Logout
