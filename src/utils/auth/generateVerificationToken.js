import crypto from "crypto"
const generateVerificationToken = (email) => {
  const hash = crypto.createHash("sha256").update(email).digest("hex")
  const timestamp = new Date().getTime().toString()
  const token = timestamp + Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2) + hash

  return token
}

export default generateVerificationToken