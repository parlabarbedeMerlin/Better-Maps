import generateVerificationToken from "@/utils/auth/generateVerificationToken"
import hashPassword from "@/utils/auth/passwords/hashPassword"
import register from "@/utils/auth/register"
import createRoute from "@/utils/database/createRoute"
const registerController = async (req, res) => {
  const { firstName, lastName, email, password } = req.body
  const newUser = {}

  if (!firstName) {
    await res.status(400).json({ message: "First name is required" })

    return
  }

  if (!/^[a-zA-Z]+$/u.test(firstName)) {
    res.status(400).json({ message: "First name must only contain letters" })

    return
  }

  if (!lastName) {
    res.status(400).json({ message: "Last name is required" })

    return
  }

  if (!/^[a-zA-Z]+$/u.test(lastName)) {
    res.status(400).json({ message: "Last name must only contain letters" })

    return
  }

  if (!email) {
    res.status(400).json({ message: "Email is required" })

    return
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(email)) {
    res.status(400).json({ message: "Email is invalid" })

    return
  }

  if (!password) {
    res.status(400).json({ message: "Password is required" })

    return
  }

  newUser.firstName = firstName[0].toUpperCase() + firstName.slice(1).toLowerCase()
  newUser.lastName = lastName
  newUser.email = email
  newUser.password = await hashPassword(password)
  newUser.verifyToken = await generateVerificationToken(email)

  try {
    await createRoute(async () => {
      try {
        await register(newUser)(req, res)
        res.status(201).json({ message: "User created successfully" })
      } catch (error) {
        res.status(500).json({ message: "An error occurred while creating the user", error: error.message })
      }
    })(req, res)
  } catch (error) {
    res.status(500).json({ message: "An error occurred while reaching the database", error: error.message })
  }
}
export default registerController