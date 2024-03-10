const verfiyMail = async (token, res) => {
  const UserModel = require("@/utils/database/models/userModel").default
  const user = await UserModel.findOne({ verifyToken: token })

  if (!user) {
    return res.status(404).json({ message: "User not found" })
  }

  user.verified = true
  user.verifyToken = ""
  await user.save()

  return res.status(200).json({ message: "User verified successfully" })
}
export default verfiyMail
