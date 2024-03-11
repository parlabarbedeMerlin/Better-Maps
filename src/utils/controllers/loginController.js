import generateAuthToken from "@/utils/auth/generateAuthToken"
import verifyPassword from "@/utils/auth/passwords/verifyPassword"
import UserModel from "@/utils/database/models/userModel"

const loginController = async (req, res) => {
  const { email, password } = req.body
  const user = await UserModel.findOne({ email })

  if (user) {
    const isPasswordCorrect = await verifyPassword(password, user.password)

    if (isPasswordCorrect && user.verified) {
      const token = generateAuthToken(user)
      res.setHeader("Set-Cookie", `token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 7}`)
      res.status(200).json({ message: "User logged in successfully", token })

      return
    }

    res.status(404).json({ message: "User or Password incorrect ! Or user is not verified, please verify your email" })
  }
}

export default loginController