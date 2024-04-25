import mailVerificationController from "@/utils/controllers/mailVerificationController"
import { createRoute } from "@/utils/database/createRoute"
const handler = createRoute(async (req, res) => {
  if (req.method === "POST") {
    await mailVerificationController(req, res)
  }

  res.status(405).json({ message: "Method not allowed ! Please refer to the documentation for more information.", method: req.method })
})
export default handler