import clsx from "clsx"
import { Field } from "formik"

const SelectField = ({ name, items, className, setCurrent, label, error, touched, onChange, ...props }) => {
  const handleChange = (e) => {
    if (setCurrent) {
      setCurrent(e.target.value)
    }

    if (onChange) {
      onChange(e)
    }
  }

  return (
    <div className={clsx("flex flex-col w-full")}>
      <label className="font-semibold" htmlFor={name}>{label} :</label>
      <Field
        as="select"
        name={name}
        placeholder={label}
        id={name}
        className={clsx(
          "h-10 w-full p-2 my-1 rounded-xl border-2 border-neutral-300 outline outline-0 focus:border-green-300 focus:outline-4 outline-offset-0 focus:outline-offset-2 outline-green-300 transition-all duration-500 text-neutral-400",
          {
            "border-red-500  outline-red-300 focus:border-red-300": error && touched
          },
          className
        )}
        onChange={handleChange}
        {...props}
      >
        {
          items.map((value, index) => (
            <option key={index} value={value}>{value}</option>
          ))
        }
      </Field>
    </div >
  )
}

export default SelectField