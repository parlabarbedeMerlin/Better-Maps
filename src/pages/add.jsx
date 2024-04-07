import Button from "@/components/inputs/buttons/Button"
import SelectField from "@/components/inputs/fields/SelectField"
import TextFiled from "@/components/inputs/fields/TextField"
import { Form, Formik } from "formik"
import { useState } from "react"
import * as yup from "yup"


const initialValues = {
  name: ""
}
const Types = [
  "restaurant",
  "museum",
  "park",
  "bar"
]
const testSchema = yup.object().shape({
  name: yup.string().required("Name is required")
})
const Add = () => {
  const [formType, setFormType] = useState(Types[0])
  const submit = async (...a) => {
    await console.log({
      a
    })
  }


  return (
    <main className={`flex-1 bg-[#E5FFE5] flex justify-center items-center `}>
      <Formik validationSchema={testSchema} initialValues={initialValues} onSubmit={submit} >
        <Form noValidate className="bg-white px-10 py-9 w-2/3 rounded-[35px] drop-shadow-2xl" >
          <div className="flex flex-col gap-4 items-center w-full md-20 sm:my-0  md:w-full sm:w-11/12">
            <div className="flex gap-8 w-full">
              <TextFiled id="name" placeholder="Place Name" className="w-3/5" />
              <SelectField
                className="w-2/5"
                name="Type"
                label="Type"
                setCurrent={setFormType}
                items={Types}
              />
            </div>
            <div className="w-full flex gap-8">
              <TextFiled id="address" placeholder="Address" className="w-4/5" />
              <TextFiled id="zip" placeholder="Zip code" className="w-1/5" />
            </div>
            <div
              className="w-full flex gap-8"
            >
              <TextFiled id="city" placeholder="City" className="w-1/2" />
              <TextFiled id="country" placeholder="Country" className="w-1/2" />
            </div>
            <p>
              {formType}
            </p>
            <Button type="submit" variant="primary" >
              Add
            </Button>
          </div>
        </Form>
      </Formik>
    </main>
  )
}

export default Add
