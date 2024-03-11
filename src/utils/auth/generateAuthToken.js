import jwt from "jsonwebtoken"

const generateAuthToken = ({ email, firstName, lastName, password, admin }) => jwt.sign({ email, firstName, lastName, password, admin }, process.env.JWT_SECRET, { expiresIn: "1h" })

export default generateAuthToken