import Logo from "@/components/Logo"
import Button from "@/components/inputs/buttons/Button"
import MobileNav from "@/components/nav/MobileNav"
import { useConnectionContext } from "@/context/connection"
import { Bars3Icon, PlusIcon, XMarkIcon } from "@heroicons/react/24/solid"
import clsx from "clsx"
import { Dosis } from "next/font/google"
import Link from "next/link"
import { useState } from "react"


// eslint-disable-next-line new-cap
const dosis = Dosis({ subsets: ["latin"] })
const NavBar = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const { connected } = useConnectionContext()
  const handleClick = () => {
    setMobileNavOpen(!mobileNavOpen)
  }

  return (
    <nav className="w-full">
      <div className="bg-white p-5 flex gap-8 justify-between items-center" >
        <Link href="/" className="flex group justify-start items-center w-1/3 ">
          <Logo className="h-14 min-h-14 min-w-16 w-auto hidden md:block" />
          <span className={clsx("select-none font-bold ms:text-5xl sm:text-4xl text-3xl text-gray-800 md:pl-5 sm:pl-2 pl-0 transition-all duration-700 group-hover:font-light", dosis.className)}>
            BetterMaps
          </span>
        </Link>
        <div className="gap-6 hidden md:flex md:items-center md:justify-end md:flex-1">
          <Link href="/places" className="font-bold text-lg hover:text-green-500 transition-all">
            places
          </Link>
          {!connected ? (
            <>
              <Button className={dosis.className} variant="secondary" href="/auth/login">Login</Button>
              <Button className={dosis.className} href="/auth/register">Register</Button>
            </>
          ) : (
            <>
              <Button className={dosis.className} href="/add">
                <PlusIcon className="size-6 font-extrabold" />
                Add
              </Button>
              <Button className={dosis.className} variant="secondary" href="/auth/logout">Logout</Button>
            </>
          )
          }
        </div>
        <div className="md:hidden block">
          {!mobileNavOpen ?
            (<Bars3Icon className="size-12 text-slate-400" onClick={handleClick} />) :
            (<XMarkIcon className="size-12 text-slate-400" onClick={handleClick} />)
          }
        </div>

      </div>
      <MobileNav open={mobileNavOpen} onClose={handleClick} connected={connected} />
    </nav>
  )
}

export default NavBar 