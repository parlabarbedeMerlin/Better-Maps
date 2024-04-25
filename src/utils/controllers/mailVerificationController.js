import verfiyMail from "@/utils/auth/verifyMail"
import createRoute from "@/utils/database/createRoute"
const mailVerificationController = (req, res) => {
  const { token } = req.body

  try {
    createRoute(async () => {
      try {
        await verfiyMail(token, res)
      }
      catch (error) {
        res.status(500).json({ message: error.message })
      }
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
export default mailVerificationController
