import sendEmail from "@/utils/mail/sendEmail"
const register = (user) => async (req, res) => {
  const UserModel = require("@/utils/database/models/userModel").default
  const newUser = new UserModel(user)

  try {
    const emailData = {
      // eslint-disable-next-line camelcase
      verification_link: `${process.env.HOST_NAME}/auth/verify/${newUser.verifyToken}`,
      // eslint-disable-next-line camelcase
      deletation_link: `${process.env.HOST_NAME}/auth/verify-cancel/${newUser.verifyToken}`,
    }
    await newUser.save()
    const email = {
      email: newUser.email,
      subject: "Better Map - Mail verification",
      templateId: "d-e930e62279954f2d90573f92e3ed7146",
      data: emailData
    }
    sendEmail(email)

    return res.status(201).json({ message: "User created successfully", user: newUser })
  }
  catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Email already exists" })
    }

    return res.status(500).json({ message: error.message })
  }
}
export default register