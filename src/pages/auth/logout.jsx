import Cookies from "js-cookie"
import { useRouter } from "next/router"
import { useEffect } from "react"

const Logout = () => {
  const router = useRouter()

  useEffect(() => {
    const logout = () => {
      try {
        Cookies.remove("token")
        router.push("/")
      }
      catch (error) {
        console.error(error)
      }
    }

    logout()

    return logout
  }, [router])

  return (
    <div>
      <h1>Logout</h1>
    </div>
  )
}

export default Logout
