import NavBar from "@/components/nav/NavBar"
import { ConnectionContextProvider } from "@/context/connection"
import "@/styles/globals.css"
import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient()
const App = ({ Component, pageProps }) => (
  <div className="min-h-screen flex flex-col">
    <QueryClientProvider client={queryClient}>
      <ConnectionContextProvider>
        <NavBar />
        <Component pageProps={pageProps} />
      </ConnectionContextProvider>
    </QueryClientProvider>

  </div>
)

export default App