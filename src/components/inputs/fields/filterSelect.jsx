const FilterSelect = ({ options, name, label, setFilter }) => (
  <div className="w-full flex flex-col gap-2">
    <label className="font-semibold" htmlFor={name}>{label || name} :</label>
    <select
      name={name}
      id={name}
      className="h-10 w-full p-2 my-1 rounded-xl border-2 border-neutral-300 outline outline-0 focus:border-green-300 focus:outline-4 outline-offset-0 focus:outline-offset-2 outline-green-300 transition-all duration-500 text-neutral-400"
      onChange={setFilter}
    >
      <option value="All">All</option>
      {options.map((type) => (
        <option key={type} value={type}>{type}</option>
      ))}
    </select>
  </div>
)

export default FilterSelect