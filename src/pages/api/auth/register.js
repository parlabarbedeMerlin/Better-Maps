import registerController from "@/utils/controllers/registerController"
import { createRoute } from "@/utils/database/createRoute"

const handler = createRoute(async (req, res) => {
  if (req.method === "POST") {
    await registerController(req, res)
  }

  res.status(405).json({ message: "Method not allowed ! Please refer to the documentation for more information.", method: req.method })
})
export default handler