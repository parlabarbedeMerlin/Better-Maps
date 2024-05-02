import BarForm from "@/components/forms/BarForm"
import MuseumForm from "@/components/forms/MuseumForm"
import ParkForm from "@/components/forms/ParkForm"
import RestaurantForm from "@/components/forms/RestaurantForm"
import Button from "@/components/inputs/buttons/Button"
import SelectField from "@/components/inputs/fields/SelectField"
import TextFiled from "@/components/inputs/fields/TextField"
import { ArtisticCurrents, BarTypes, FoodTypes, ParkTypes, Prices, Privacys, Stars, Types, TypesOfArt } from "@/utils/config"
import placeSchema from "@/utils/schema/placeSchema"
import axios from "axios"
import clsx from "clsx"
import { Form, Formik } from "formik"
import { Dosis } from "next/font/google"
import { useState } from "react"

// eslint-disable-next-line new-cap
const dosis = Dosis({ subsets: ["latin"] })
export const getServerSideProps = async ({ params: { placeId } }) => {
  const { data: place } = await axios.get(`${process.env.HOST_NAME}/api/places/${placeId}`)

  return {
    props: {
      ...place,
    }
  }
}
const Edit = ({ pageProps: place }) => {
  const initialValues = place
  const [formType, setFormType] = useState(place.type)
  const handleSubmit = (values) => {
    // eslint-disable-next-line no-underscore-dangle
    axios.patch(`/api/places/${place._id}`, values)
  }

  return (
    <main className={clsx("flex-1 bg-[#E5FFE5] flex justify-center items-center", dosis.className)}>
      <Formik validationSchema={placeSchema} initialValues={initialValues} onSubmit={handleSubmit} >
        {({ errors, touched, handleChange, handleBlur }) => (
          <Form noValidate className="bg-white px-10 py-9 my-9 w-2/3 rounded-[35px] drop-shadow-2xl" >
            <div className="flex flex-col gap-4 items-center w-full md-20 sm:my-0  md:w-full sm:w-11/12">
              <h1 className="text-3xl font-bold">Edit a new place<span className="font-normal italic text-2xl"> to be !</span></h1>
              <div className="flex gap-8 w-full flex-col md:flex-row">
                <div className="w-full md:w-3/5">
                  <TextFiled id="placeName" name="placeName" placeholder="Place Name" error={errors.placeName} touched={touched.placeName} onChange={handleChange} onBlur={handleBlur} />
                  <span className="text-red-500">{errors.placeName && touched.placeName && (<>{errors.placeName}</>)}</span>
                </div>
                <div className="w-full md:w-2/5">
                  <SelectField name="type" label="Type" error={errors.type} touched={touched.type} setCurrent={setFormType} items={Types} onChange={handleChange} onBlur={handleBlur} />
                  <span className="text-red-500">{errors.type && touched.type && (<>{errors.type}</>)}</span>
                </div>
              </div>
              <div className="w-full flex flex-col gap-8 md:flex-row">
                <div className="w-full md:w-4/5">
                  <TextFiled id="address" name="address" placeholder="Address" onChange={handleChange} onBlur={handleBlur} error={errors.address} touched={touched.address} />
                  <span className="text-red-500">{errors.address && touched.address && (<>{errors.address}</>)}</span>
                </div>
                <div className="w-full md:w-1/5">
                  <TextFiled id="zipCode" name="zipCode" placeholder="Zip Code" onChange={handleChange} onBlur={handleBlur} error={errors.zipCode} touched={touched.zipCode} />
                  <span className="text-red-500">{errors.zipCode && touched.zipCode && (<>{errors.zipCode}</>)}</span>
                </div>
              </div>
              <div className="w-full flex flex-col gap-8 md:flex-row">
                <div className="w-full md:w-1/2">
                  <TextFiled id="city" name="city" placeholder="City" onChange={handleChange} onBlur={handleBlur} error={errors.city} touched={touched.city} />
                  <span className="text-red-500">{errors.city && touched.city && (<>{errors.city}</>)}</span>
                </div>
                <div className="w-full md:w-1/2">
                  <TextFiled id="country" name="country" placeholder="Country" onChange={handleChange} onBlur={handleBlur} error={errors.country} touched={touched.country} />
                  <span className="text-red-500">{errors.country && touched.country && (<>{errors.country}</>)}</span>
                </div>
              </div>
              <>
                {(formType === "🍔 Restaurant") && (<RestaurantForm foodTypes={FoodTypes} stars={Stars} prices={Prices} errors={errors} touched={touched} handleChange={handleChange} handleBlur={handleBlur} />)}
                {(formType === "🏛 Museum") && (<MuseumForm artisticCurrents={ArtisticCurrents} typesOfArt={TypesOfArt} stars={Stars} prices={Prices} errors={errors} touched={touched} handleChange={handleChange} handleBlur={handleBlur} />)}
                {(formType === "🌳 Park") && (<ParkForm parkTypes={ParkTypes} privacys={Privacys} stars={Stars} prices={Prices} errors={errors} touched={touched} handleChange={handleChange} handleBlur={handleBlur} />)}
                {(formType === "🍺 Bar") && (<BarForm barTypes={BarTypes} stars={Stars} prices={Prices} errors={errors} touched={touched} handleChange={handleChange} handleBlur={handleBlur} />)}
              </>
              { }
              <Button type="submit" variant="primary" >Edit</Button>
            </div>
          </Form>)}
      </Formik>
    </main >
  )
}

export default Edit
