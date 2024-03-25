import NavBar from "@/components/nav/NavBar"
import { ConnectionContextProvider } from "@/context/connection"
import "@/styles/globals.css"

const App = ({ Component, pageProps }) => (
  <div className="min-h-screen flex flex-col">
    <ConnectionContextProvider>
      <NavBar />
      <Component pageProps={pageProps} />
    </ConnectionContextProvider>
  </div>
)

export default App