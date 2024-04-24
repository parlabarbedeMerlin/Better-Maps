import verifyTokenValidity from "@/utils/auth/verifyTokenValidity"
import checkUrls from "@/utils/checkUrls"
import { protectedUrls } from "@/utils/config"

// eslint-disable-next-line consistent-return
export const middleware = async (request) => {
  if (checkUrls(request.nextUrl.pathname, protectedUrls)) {
    try {
      const token = request.cookies.get("token")?.value
      const user = await verifyTokenValidity(token)

      if (!token || !user) {
        return Response.redirect(new URL("/auth/login", request.url))
      }

      request.user = user
    } catch (error) {
      return Response.redirect(new URL("/auth/login", request.url))
    }
  }
}