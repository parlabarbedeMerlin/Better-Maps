import verifyTokenValidity from "@/utils/auth/verifyTokenValidity"
import { Types } from "@/utils/config"
import createRoute from "@/utils/database/createRoute"
import PlaceModel from "@/utils/database/models/placeModel"
import placeSchema from "@/utils/schema/placeSchema"

const addPlaceController = async (req, res) => {
  const { token } = req.cookies
  const decodedToken = await verifyTokenValidity(token)

  if (!token) {
    res.status(401).json({ message: "You are not authenticated" })
  }

  if (!decodedToken) {
    res.status(401).json({ message: "Invalid token" })
  }

  const { placeName, address, zipCode, city, country, type, foodType, artisticCurrent, typeOfArt, privacy, parkType, barType, starRating, price } = req.body
  const place = {
    placeName,
    address,
    zipCode,
    city,
    country,
    type,
    author: decodedToken.email
  }

  if (type === "🍔 Restaurant") {
    place.foodType = foodType
  }

  if (type === "🏛 Museum") {
    place.artisticCurrent = artisticCurrent
    place.typeOfArt = typeOfArt
  }

  if (type === "🏞 Park") {
    place.privacy = privacy
    place.parkType = parkType
  }

  if (type === "🍺 Bar") {
    place.barType = barType
  }

  if (Types.includes(type)) {
    place.starRating = starRating
    place.price = price
  }

  try {
    await createRoute(async () => {
      try {
        await placeSchema.validate(place)
        await PlaceModel.create(place)
        res.status(201).json({ message: "Place added successfully", place })
      } catch (error) {
        res.status(400).json({ message: "Invalid place data", error: error.message })
      }
    })(req, res)
  } catch (error) {
    res.status(500).json({ message: "An error occurred while reaching the database", error: error.message })
  }
}
export default addPlaceController