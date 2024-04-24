import SelectField from "@/components/inputs/fields/SelectField"
import { useState } from "react"
const BarForm = ({ barTypes, stars, prices, errors, touched, handleChange, handleBlur, ...props }) => {
  const [barType, setBarType] = useState(barTypes[0])
  const [starRating, setStarRating] = useState(stars[0])
  const [price, setPrice] = useState(prices[0])


  return (
    <>
      <div className="w-full flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3">
          <SelectField name="barType" label="Food Type" items={barTypes} current={barType} setCurrent={setBarType} error={errors.barType} touched={touched.barType} onChange={handleChange} onBlur={handleBlur} {...props} />
          <span className="text-red-500">{errors.barType && touched.barType && (<>{errors.barType}</>)}</span>
        </div>
        <div className="w-full md:w-1/3">
          <SelectField name="starRating" label="Stars /5" items={stars} current={starRating} setCurrent={setStarRating} error={errors.starRating} touched={touched.starRating} onChange={handleChange} onBlur={handleBlur} {...props} />
          <span className="text-red-500">{errors.starRating && touched.starRating && (<>{errors.starRating}</>)}</span>
        </div>
        <div className="w-full md:w-1/3">
          <SelectField name="price" label="Price" items={prices} current={price} setCurrent={setPrice} error={errors.price} touched={touched.price} onChange={handleChange} onBlur={handleBlur} {...props} />
          <span className="text-red-500">{errors.price && touched.price && (<>{errors.price}</>)}</span>
        </div>
      </div >
    </>
  )
}

export default BarForm