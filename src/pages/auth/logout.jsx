import Cookies from "js-cookie"
import { useRouter } from "next/router"
import { useEffect } from "react"

const Logout = () => {
  const router = useRouter()
  useEffect(() => () => {
    Cookies.remove("token")
    router.push("/")
  }
  )

  router.push("/")

  return (
    <div>
      <h1>Logout</h1>
    </div>
  )
}

export default Logout
