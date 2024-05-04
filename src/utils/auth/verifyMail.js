import UserModel from "@/utils/database/models/userModel"

const verfiyMail = async (token, res) => {
  const user = await UserModel.findOne({ verifyToken: token })

  if (!user) {
    res.status(404).json({ message: "User not found" })
  }

  user.verified = true
  user.verifyToken = ""
  await user.save()

  res.status(200).json({ message: "User verified successfully" })
}
export default verfiyMail
