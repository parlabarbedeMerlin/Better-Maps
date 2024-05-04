import { createRoute } from "@/utils/database/createRoute"
import PlaceModel from "@/utils/database/models/placeModel"
import addPlaceController from "../../utils/controllers/addPlaceController"

const handler = createRoute(async (req, res) => {
  if (req.method === "GET") {
    const { skip, limit } = req.query
    const filters = JSON.parse(req.query.filters)
    console.log(filters)
    const places = await PlaceModel.find({ ...filters }).skip(skip || 0).limit(limit || 0)
    const count = await PlaceModel.countDocuments({ ...filters })
    res.status(200).json({ places, count })
  }

  if (req.method === "POST") {
    await addPlaceController(req, res)
  }

  res.status(405).json({ message: "Method not allowed ! Please refer to the documentation for more information.", method: req.method })
})
export default handler