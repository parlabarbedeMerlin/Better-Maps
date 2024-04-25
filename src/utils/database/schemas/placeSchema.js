import { ArtisticCurrents, BarTypes, FoodTypes, ParkTypes, Prices, Privacys, Stars, Types, TypesOfArt } from "@/utils/config"
import { Schema } from "mongoose"

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/u
const placeSchema = new Schema({
  placeName: { type: String, required: true },
  type: { type: String, required: true },
  address: { type: String, required: true },
  zipCode: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  author: {
    type: String,
    match: emailRegex,
    index: true,
    required: true
  },
  foodType: {
    type: String,
    required() {
      return this.type === Types[0]
    },
    enum: {
      values: FoodTypes,
      message: "Invalid food type"
    }
  },
  artisticCurrent: {
    type: String,
    required() {
      return this.type === Types[1]
    },
    enum: {
      values: ArtisticCurrents,
      message: "Invalid artistic current"
    }
  },
  typeOfArt: {
    type: String,
    required() {
      return this.type === Types[1]
    },
    enum: {
      values: TypesOfArt,
      message: "Invalid type of art"
    }
  },
  privacy: {
    type: String,
    required() {
      return this.type === Types[2]
    },
    enum: {
      values: Privacys,
      message: "Invalid privacy"
    }
  },
  parkType: {
    type: String,
    required() {
      return this.type === Types[2]
    },
    enum: {
      values: ParkTypes,
      message: "Invalid park type"
    }
  },
  barType: {
    type: String,
    required() {
      return this.type === Types[3]
    },
    enum: {
      values: BarTypes,
      message: "Invalid bar type"
    }
  },
  starRating: {
    type: String,
    required() {
      return Types.includes(this.type)
    },
    enum: {
      values: Stars,
      message: "Invalid star rating"
    }
  },
  price: {
    type: String,
    required() {
      return Types.includes(this.type)
    },
    enum: {
      values: Prices,
      message: "Invalid price"
    }
  }
})

export default placeSchema
