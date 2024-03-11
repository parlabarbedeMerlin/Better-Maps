const TextFiled = ({ label, placeholder, id, name, ...props }) => (
  <div className="w-full">
    <label className="font-semibold" htmlFor={id}>{label ?? placeholder} :</label>
    <input className="h-10 w-full p-2 my-1 rounded-xl border-2 border-neutral-400 outline outline-0  focus:border-green-300 focus:outline-4 outline-offset-0 focus:outline-offset-2 outline-green-300 transition-all duration-500" name={name ?? id} id={id} placeholder={placeholder ?? label} {...props} />
  </div>
)

export default TextFiled