import NavBar from "@/components/nav/NavBar"
import "@/styles/globals.css"

const App = ({ Component, pageProps }) => (
  <div className="min-h-screen flex flex-col">
    <NavBar />
    <Component pageProps={pageProps} />
  </div>
)

export default App