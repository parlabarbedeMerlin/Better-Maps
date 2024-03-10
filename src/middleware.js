const middleware = (request) => {
  // eslint-disable-next-line no-console
  console.log(request.url)
}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
}
export default middleware