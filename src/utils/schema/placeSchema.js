import * as yup from "yup"

const placeSchema = yup.object().shape({
  placeType: yup.string().required(),
  placeName: yup.string().required(),
  author: yup.string().required(),
  visibility: yup.boolean().required(),
  address: yup.string().required(),
  city: yup.string().required(),
  postalCode: yup.string().required(),
  country: yup.string().required(),
  cuisineType: yup.string().when("placeType", {
    is: "Restaurant",
    then: yup.string().required(),
    otherwise: yup.string().notRequired()
  }),
  starRating: yup.number().when("placeType", {
    is: "Restaurant",
    then: yup.number().min(1).max(3).required(),
    otherwise: yup.number().notRequired()
  }),
  averagePrice: yup.number().when("placeType", {
    is: "Restaurant",
    then: yup.number().required(),
    otherwise: yup.number().notRequired()
  }),
  artisticMovement: yup.string().when("placeType", {
    is: "Museum",
    then: yup.string().required(),
    otherwise: yup.string().notRequired()
  }),
  artType: yup.string().when("placeType", {
    is: "Museum",
    then: yup.string().required(),
    otherwise: yup.string().notRequired()
  }),
  museumFee: yup.boolean().when("placeType", {
    is: "Museum",
    then: yup.boolean().required(),
    otherwise: yup.boolean().notRequired()
  }),
  museumPrice: yup.number().when(["placeType", "museumFee"], {
    is: (placeType, museumFee) => placeType === "Museum" && museumFee === true,
    then: yup.number().required(),
    otherwise: yup.number().notRequired()
  }),
  barType: yup.string().when("placeType", {
    is: "Bar",
    then: yup.string().required(),
    otherwise: yup.string().notRequired()
  }),
  barAveragePrice: yup.number().when("placeType", {
    is: "Bar",
    then: yup.number().required(),
    otherwise: yup.number().notRequired()
  }),
  parkType: yup.string().when("placeType", {
    is: "Park",
    then: yup.string().required(),
    otherwise: yup.string().notRequired()
  }),
  parkAccessibility: yup.string().when("placeType", {
    is: "Park",
    then: yup.string().required(),
    otherwise: yup.string().notRequired()
  }),
  parkFee: yup.boolean().when("placeType", {
    is: "Park",
    then: yup.boolean().required(),
    otherwise: yup.boolean().notRequired()
  }),
  parkPrice: yup.number().when(["placeType", "parkFee"], {
    is: (placeType, parkFee) => placeType === "Park" && parkFee === true,
    then: yup.number().required(),
    otherwise: yup.number().notRequired()
  })
})

export default placeSchema
