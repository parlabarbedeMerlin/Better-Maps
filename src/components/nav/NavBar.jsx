import Logo from "@/components/Logo"
import Button from "@/components/inputs/buttons/Button"
import { useConnectionContext } from "@/context/connection"
import { Bars3Icon, PlusIcon } from "@heroicons/react/24/solid"
import clsx from "clsx"
import { Dosis } from "next/font/google"
import Link from "next/link"


// eslint-disable-next-line new-cap
const dosis = Dosis({ subsets: ["latin"] })
const NavBar = () => {
  const { connected } = useConnectionContext()

  return (
    <nav className="bg-white p-5 flex gap-8 justify-between items-center" >
      <Link href="/" className="flex group justify-start items-center w-1/3 ">
        <Logo className="h-14 w-auto" />
        <span className={clsx("font-bold text-5xl text-gray-800 pl-5 transition-all duration-700 group-hover:font-light", dosis.className)}>
          BetterMaps
        </span>
      </Link>
      <div className="gap-6 hidden md:flex md:justify-end md:flex-1">
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
        <Bars3Icon className="size-12 text-slate-400" />
      </div>
    </nav>
  )
}

export default NavBar 