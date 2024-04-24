import SelectField from "@/components/inputs/fields/SelectField"
import { useState } from "react"

const MuseumForm = ({ typesOfArt, artisticCurrents, stars, prices, errors, touched, handleChange, handleBlur, ...props }) => {
  const [artisticCurrent, setArtisticCurrent] = useState(artisticCurrents[0])
  const [typeOfArt, setTypeOfArt] = useState(typesOfArt[0])
  const [starRating, setStarRating] = useState(stars[0])
  const [price, setPrice] = useState(prices[0])


  return (
    <>
      <div className="w-full flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4">
          <SelectField name="artisticCurrent" label="Artistic current" items={artisticCurrents} current={artisticCurrent} setCurrent={setArtisticCurrent} error={errors.artisticCurrent} touched={touched.artisticCurrent} onChange={handleChange} onBlur={handleBlur} {...props} />
          <span className="text-red-500">{errors.artisticCurrent && touched.artisticCurrent && (<>{errors.artisticCurrent}</>)}</span>
        </div>
        <div className="w-full md:w-1/4">
          <SelectField name="typeOfArt" label="Type of art" items={typesOfArt} current={typeOfArt} setCurrent={setTypeOfArt} error={errors.typeOfArt} touched={touched.typeOfArt} onChange={handleChange} onBlur={handleBlur} {...props} />
          <span className="text-red-500">{errors.typeOfArt && touched.typeOfArt && (<>{errors.typeOfArt}</>)}</span>
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
export default MuseumForm