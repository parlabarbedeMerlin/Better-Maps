import Button from "@/components/inputs/buttons/Button"
import { Dialog } from "@headlessui/react"
import clsx from "clsx"
import { Dosis } from "next/font/google"


// eslint-disable-next-line new-cap
const dosis = Dosis({ subsets: ["latin"] })
const PopUp = ({ open, onClose, clickBtn, message, success, btnText }) => (
  <Dialog as="div" open={open} onClose={onClose}>
    <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
    <div className={"fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center gap-2 w-11/12 md:w-1/4 h-1/4 items-center bg-white p-10 rounded-xl"}>
      <Dialog.Title as="h3" className={clsx(dosis.className, "text-4xl font-bold")}>
        {success ? "✅ Success" : "❌ Error"}
      </Dialog.Title>
      <Dialog.Description as="p" className={clsx("text-lg text-center font-semibold", { "text-green-600": success, "text-red-500": !success })}>
        {!success && "An error occurred"} <br />
        {message}
      </Dialog.Description>
      <Button type={"button"} variant={clsx({ "primary": success, "caution": !success })} onClick={clickBtn ?? onClose}>
        {success ? btnText : "Close"}
      </Button>
    </div>
  </Dialog>
)

export default PopUp
