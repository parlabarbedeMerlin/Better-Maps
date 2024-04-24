import { clsx } from "clsx"
import Link from "next/link"

const styles = {
  primary: "bg-[#7ADF7A] hover:bg-[#348E34] text-black hover:text-white primary-btn",
  secondary: "bg-[#d1ffd1] hover:bg-[#7ADF7A] text-black secondary-btn ",
  caution: "bg-red-400 hover:bg-white text-white text-white hover:text-red-400 caution-btn"
}
const Button = ({ type, className, children, variant = "primary", ...props }) => (
  type === "button" || type === "submit") ? (
  <button className={clsx("select-none rounded-lg p-3 px-4 font-bold text-xl flex justify-between items-center transition-all duration-300", styles[variant], className)} type={type} {...props}>
    {children}
  </button>
) : (
  <Link className={clsx("select-none rounded-lg p-3 px-4 font-bold text-xl flex justify-between items-center transition-all duration-300", styles[variant], className)} {...props}>
    {children}
  </Link>
)

export default Button