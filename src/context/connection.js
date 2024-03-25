const { createContext, useState, useContext } = require("react")
const ConnectionContext = createContext({})

export const ConnectionContextProvider = ({ children }) => {
  const [connected, setConnected] = useState(false)

  return (
    <ConnectionContext.Provider value={{ connected, setConnected }}>
      {children}
    </ConnectionContext.Provider>
  )
}

export const useConnectionContext = () => useContext(ConnectionContext)