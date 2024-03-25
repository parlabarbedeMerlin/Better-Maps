import Cookies from "js-cookie"

const { createContext, useState, useContext, useEffect } = require("react")
const ConnectionContext = createContext({})

export const ConnectionContextProvider = ({ children }) => {
  const [connected, setConnected] = useState()

  useEffect(() => async () => {
    const connect = await Cookies.get("token")
    await setConnected(connect)
    console.log("ConnectionContextProvider", connect)
  })

  return (
    <ConnectionContext.Provider value={{ connected, setConnected }}>
      {children}
    </ConnectionContext.Provider>
  )
}

export const useConnectionContext = () => useContext(ConnectionContext)