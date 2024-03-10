import { Schema } from "mongoose"
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/u
const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    match: emailRegex,
    index: true,
    unique: true
  },
  password: String,
  verified: {
    type: Boolean,
    default: false
  },
  verifyToken: {
    type: String,
  },
  admin: {
    type: Boolean,
    default: false
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})
export default userSchema