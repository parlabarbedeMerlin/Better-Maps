import * as yup from "yup"

const loginSchema = yup.object().shape({
  password: yup.string().required(),
  email: yup.string().email().required()
})

export default loginSchema