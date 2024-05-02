import clsx from "clsx"
import { Field } from "formik"

const TextFiled = ({ label, placeholder, id, name, error, touched, className, ...props }) => (
  <div className="w-full">
    <label className="font-semibold" htmlFor={id}>{label ?? placeholder} :</label>
    <Field className={clsx("rounded-xl border-2 border-neutral-300 outline outline-0  focus:border-green-300 focus:outline-4 outline-offset-0 focus:outline-offset-2 outline-green-300  h-10 w-full p-2 my-1 outline-none transition-all duration-500",
      {
        "border-red-500  outline-red-300 focus:border-red-300": error && touched
      },
      className
    )
    } name={name ?? id} id={id} placeholder={placeholder ?? label} {...props} />
  </div>
)

export default TextFiled