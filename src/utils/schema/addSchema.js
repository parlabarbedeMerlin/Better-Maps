import { ArtisticCurrents, BarTypes, FoodTypes, ParkTypes, Prices, Privacys, Stars, Types, TypesOfArt } from "@/utils/config"
import * as yup from "yup"

const addSchema = yup.object().shape({
  placeName: yup.string().required("Name is required"),
  type: yup.string().required("Type is required"),
  address: yup.string().required("Address is required"),
  zipCode: yup.string().required("Zip code is required"),
  city: yup.string().required("City is required"),
  country: yup.string().required("Country is required"),
  foodType: yup.string().when("type", {
    is: "restaurant",
    then: (schema) => schema.required("Food type is required").oneOf(FoodTypes, "Invalid food type"),
  }),
  artisticCurrent: yup.string().when("type", {
    is: "museum",
    then: (schema) => schema.required("Artistic current is required").oneOf(ArtisticCurrents, "Invalid artistic current"),
  }),
  typeOfArt: yup.string().when("type", {
    is: "museum",
    then: (schema) => schema.required("Type of art is required").oneOf(TypesOfArt, "Invalid type of art"),
  }),
  privacy: yup.string().when("type", {
    is: "park",
    then: (schema) => schema.required("Privacy is required").oneOf(Privacys, "Invalid privacy"),
  }),
  parkType: yup.string().when("type", {
    is: "park",
    then: (schema) => schema.required("Park type is required").oneOf(ParkTypes, "Invalid park type"),
  }),
  barType: yup.string().when("type", {
    is: "bar",
    then: (schema) => schema.required("Bar type is required").oneOf(BarTypes, "Invalid bar type"),
  }),
  starRating: yup.string().when("type", {
    is: (value) => Types.includes(value),
    then: (schema) => schema.required("Star rating is required").oneOf(Stars, "Invalid star rating"),
  }),
  price: yup.string().when("type", {
    is: (value) => Types.includes(value),
    then: (schema) => schema.required("Price is required").oneOf(Prices, "Invalid price")
  })
})

export default addSchema