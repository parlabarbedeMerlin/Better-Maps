import Button from "@/components/inputs/buttons/Button"
import { Dosis } from "next/font/google"


// eslint-disable-next-line new-cap
const dosis = Dosis({ subsets: ["latin"] })
const Custom404 = () => (
  <main className={`flex-1 bg-gradient-to-b from-green-500 to-emerald-300 select-none flex flex-col justify-center items-center ${dosis.className}`}>
    <span
      className={"text-[350px] italic font-extrabold text-gray-800 mb-4"}
    >
      404
    </span>
    <span
      className={"text-4xl italic font-bold text-gray-800 mb-8"}
    >
      Page not found
    </span>
    <Button href="/" variant="primary" className="text-2xl">
      Go back home
    </Button>
  </main >
)

export default Custom404