import Link from "next/link"

const MobileNav = ({ connected, open, onClose }) => (
  <>
    {open && (
      <>
        <Link href="/places" className="w-full text-center border-t block p-4 text-lg hover:text-green-500 transition-all" onClick={onClose}>
          places
        </Link>
        <>
          {!connected ? (
            <>
              <Link href="/auth/login" className="w-full text-center border-t block p-4 text-lg hover:text-green-500 transition-all" onClick={onClose}>
                Login
              </Link>
              <Link href="/auth/register" className="w-full text-center border-t block p-4 text-lg hover:text-green-500 transition-all" onClick={onClose}>
                Register
              </Link>
            </>
          ) : (
            <>
              <Link href="/add" className="w-full text-center border-t block p-4 text-lg hover:text-green-500 transition-all" onClick={onClose}>
                Add
              </Link>
              <Link href="/auth/logout" className="w-full text-center border-t block p-4 text-lg hover:text-green-500 transition-all" onClick={onClose}>
                Logout
              </Link>
            </>
          )}
        </>
      </>
    )}
  </>
)

export default MobileNav