import verifyTokenValidity from "@/utils/auth/verifyTokenValidity"
import { createRoute } from "@/utils/database/createRoute"
import PlaceModel from "../../../utils/database/models/placeModel"

const handler = createRoute(async (req, res) => {
  const { placeId } = req.query
  const place = await PlaceModel.findById(placeId)

  if (req.method === "GET") {
    if (req && req.cookies && req.cookies.token) {
      const { email } = await verifyTokenValidity(req.cookies.token)
      res.status(200).json({
        place,
        owner: place.author === email
      })
    }

    res.status(200).json({
      place,
      owner: false
    })
  }

  if (req.method === "PATCH") {
    if (!req || !req.cookies || !req.cookies.token) {
      return res.status(401).json({ message: "Unauthorized !" })
    }

    const { email } = await verifyTokenValidity(req.cookies.token)

    if (!email) {
      return res.status(401).json({ message: "Unauthorized !" })
    }

    if (!place) {
      return res.status(404).json({ message: "Place not found !" })
    }


    if (place.author === email) {
      const newPlace = await req.body

      // eslint-disable-next-line no-underscore-dangle
      if (newPlace._id) { delete newPlace._id }

      Object.assign(place, newPlace)
      await place.save()

      res.status(200).json({ message: "Place updated successfully !" })
    }
  }

  res.status(405).json({ message: "Method not allowed ! Please refer to the documentation for more information.", method: req.method })

  return null
}
)

export default handler