import generateVerificationToken from "@/utils/auth/generateVerificationToken"
import hashPassword from "@/utils/auth/passwords/hashPassword"
import register from "@/utils/auth/register"
import registerSchema from "@/utils/schema/registerSchema"
const registerController = async (req, res) => {
  const user = req.body
  const newUser = {}

  try {
    await registerSchema.validate(user)
    newUser.firstName = user.firstName[0].toUpperCase() + user.firstName.slice(1).toLowerCase()
    newUser.lastName = user.lastName
    newUser.email = user.email
    newUser.password = await hashPassword(user.password)

    if (process.env.SENDGRID_API_KEY) {
      newUser.verifyToken = await generateVerificationToken(user.email)
    }
  }
  catch (error) {
    res.status(400).json({ message: "Invalid user data", error: error.message })
  }


  try {
    await register(newUser)(req, res)
    await res.status(201).json({ message: "User created successfully" })
  } catch (error) {
    res.status(500).json({ message: "An error occurred while creating the user", error: error.message })
  }
}
export default registerController