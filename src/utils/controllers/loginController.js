import generateAuthToken from "@/utils/auth/generateAuthToken"
import verifyPassword from "@/utils/auth/passwords/verifyPassword"
import UserModel from "@/utils/database/models/userModel"

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await UserModel.findOne({ email })

    if (user) {
      const isPasswordCorrect = await verifyPassword(password, user.password)

      if (isPasswordCorrect && user.verified) {
        generateAuthToken(user, res)

        return
      }

      res.status(404).json({ message: "User or Password incorrect ! Or user is not verified, please verify your email" })
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred while logging in", error: error.message })
  }
}

export default loginController