import { jwtVerify } from "jose"

const verifyTokenValidity = async (token) => {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)

    return (await jwtVerify(token, secret)).payload
  } catch (error) {
    return false
  }
}

export default verifyTokenValidity