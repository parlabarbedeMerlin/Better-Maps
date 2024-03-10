const hashPassword = async (password) => {
  const bcrypt = require("bcrypt")
  const saltRounds = 10
  const hashedPassword = await bcrypt.hash(password, saltRounds)

  return hashedPassword
}
export default hashPassword