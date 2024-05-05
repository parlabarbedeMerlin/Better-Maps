import UserModel from "@/utils/database/models/userModel"
import sendEmail from "@/utils/mail/sendEmail"
const register = (user) => async (req, res) => {
  const newUser = new UserModel(user)

  try {
    const emailData = {
      // eslint-disable-next-line camelcase
      verification_link: `${process.env.HOST_NAME}auth/verify/${newUser.verifyToken}`,
      // eslint-disable-next-line camelcase
      deletation_link: `${process.env.HOST_NAME}auth/verify-cancel/${newUser.verifyToken}`,
    }
    await newUser.save()
    const email = {
      email: newUser.email,
      subject: "BetterMaps - Mail verification",
      templateId: process.env.MAIL_VERIFICATION_TEMPLATE_ID,
      data: emailData
    }

    try {
      await sendEmail(email)
    } finally {
      res.status(201).json({ message: "User created successfully! Please check your mails to verify your account" })
    }
  }
  catch (error) {
    if (error.code === 11000) {
      res.status(409).json({ message: "Email already exists! Verfiy your account or use another email" })
    }

    res.status(500).json({ message: error.message })
  }
}
export default register