import clsx from "clsx"
import { Field } from "formik"

const SelectField = ({ name, items, className, label, setCurrent, ...props }) => (
  <div className={clsx("w-full flex flex-col", className)}>
    <label className="font-semibold" htmlFor={name}>{label} :</label>
    <Field
      as="select"
      name={name}
      placeholder={label}
      id={name}
      className="h-10 w-full p-2 my-1 rounded-xl border-2 border-neutral-400 outline outline-0 focus:border-green-300 focus:outline-4 outline-offset-0 focus:outline-offset-2 outline-green-300 transition-all duration-500 text-gray-500"
      {...props}
      onChange={(e) => setCurrent(e.target.value)}
    >
      {
        items.map((value, index) => (
          <option key={index} value={value}>{value}</option>
        ))
      }
    </Field>
  </div >
)

export default SelectField