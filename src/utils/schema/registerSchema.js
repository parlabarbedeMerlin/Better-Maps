import * as yup from "yup"

const registerSchema = yup.object().shape({
  confirmPassword: yup.string().required().oneOf([yup.ref("password"), null], "Passwords must match"),
  password: yup.string().required().min(8),
  lastName: yup.string().required(),
  firstName: yup.string().required(),
  email: yup.string().email().required(),
})

export default registerSchema