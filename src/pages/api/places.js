import addPlaceController from "@/utils/controllers/addPlaceController"
import { createRoute } from "@/utils/database/createRoute"

const handler = createRoute(async (req, res) => {
  if (req.method === "POST") {
    await addPlaceController(req, res)
  }

  res.status(405).json({ message: "Method not allowed ! Please refer to the documentation for more information.", method: req.method })
})
export default handler