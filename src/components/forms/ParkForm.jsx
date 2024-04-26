import SelectField from "@/components/inputs/fields/SelectField"
import { useState } from "react"

const ParkForm = ({ parkTypes, privacys, stars, prices, errors, touched, handleChange, handleBlur, ...props }) => {
  const [privacy, setPrivacy] = useState(parkTypes[0])
  const [parkType, setParkType] = useState(privacys[0])
  const [starRating, setStarRating] = useState(stars[0])
  const [price, setPrice] = useState(prices[0])


  return (
    <>
      <div className="w-full flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4">
          <SelectField name="privacy" label="Privacy" items={privacys} current={privacy} setCurrent={setPrivacy} error={errors.privacy} touched={touched.privacy} onChange={handleChange} onBlur={handleBlur} {...props} />
          <span className="text-red-500">{errors.privacy && touched.privacy && (<>{errors.privacy}</>)}</span>
        </div>
        <div className="w-full md:w-1/4">
          <SelectField name="parkType" label="Type of park" items={parkTypes} current={parkType} setCurrent={setParkType} error={errors.parkType} touched={touched.parkType} onChange={handleChange} onBlur={handleBlur} {...props} />
          <span className="text-red-500">{errors.parkType && touched.parkType && (<>{errors.parkType}</>)}</span>
        </div>
        <div className="w-full md:w-1/4">
          <SelectField name="starRating" label="Rating" items={stars} current={starRating} setCurrent={setStarRating} error={errors.starRating} touched={touched.starRating} onChange={handleChange} onBlur={handleBlur} {...props} />
          <span className="text-red-500">{errors.starRating && touched.starRating && (<>{errors.starRating}</>)}</span>
        </div>
        <div className="w-full md:w-1/4">
          <SelectField name="price" label="Price" items={prices} current={price} setCurrent={setPrice} error={errors.price} touched={touched.price} onChange={handleChange} onBlur={handleBlur} {...props} />
          <span className="text-red-500">{errors.price && touched.price && (<>{errors.price}</>)}</span>
        </div>
      </div >
    </>
  )
}
export default ParkForm