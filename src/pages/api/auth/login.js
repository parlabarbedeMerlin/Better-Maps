import loginController from "@/utils/controllers/loginController"

const handler = async (req, res) => {
  if (req.method === "POST") {
    await loginController(req, res)

    return
  }

  res.status(405).json({ message: "Method not allowed ! Please refer to the documentation for more information.", method: req.method })
}
export default handler 