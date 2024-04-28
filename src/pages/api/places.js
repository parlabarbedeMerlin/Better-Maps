import addPlaceController from "@/utils/controllers/addPlaceController"
import { createRoute } from "@/utils/database/createRoute"
import PlaceModel from "@/utils/database/models/placeModel"

const handler = createRoute(async (req, res) => {
  if (req.method === "POST") {
    await addPlaceController(req, res)
  }

  if (req.method === "GET") {
    const { skip, limit } = req.query
    await PlaceModel.find({}).skip(skip || 0).limit(limit || 0).then((places) => {
      res.status(200).json({ places })
    })
  }

  res.status(405).json({ message: "Method not allowed ! Please refer to the documentation for more information.", method: req.method })
})
export default handler