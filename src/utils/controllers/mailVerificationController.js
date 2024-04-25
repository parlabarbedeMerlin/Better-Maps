import verfiyMail from "@/utils/auth/verifyMail"
const mailVerificationController = async (req, res) => {
  const { token } = req.body

  try {
    await verfiyMail(token, res)
  }
  catch (error) {
    res.status(500).json({ message: error.message })
  }
}
export default mailVerificationController
