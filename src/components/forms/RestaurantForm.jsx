import SelectField from "@/components/inputs/fields/SelectField"
import { Field } from "formik"

const types = [
  "Fast Food",
  "French",
  "Italian",
  "Japanese",
  "Mexican",
  "Vegetarian",
  "Vegan",
  "Other"
]
const RestaurantForm = () => (
  <>
    <div className="w-full">
      <SelectField className="w-2/5" name="Type" label="Type" items={types} />
      <Field className="w-3/5" as="range" />
    </div>
  </>
)

export default RestaurantForm