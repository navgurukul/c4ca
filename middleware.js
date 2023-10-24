import { NextResponse } from "next/server";

export default async function middleware(req) {
  const { pathname } = req.nextUrl;
  const loggedIn = req.cookies.has("user");
  const openRoutes = ["/login"];
  const handlePage = pathname.split("/")[1];
  const user = req.cookies.get("user");
  if (!pathname.startsWith("/teacher") && !pathname.startsWith("/student")) {
    return NextResponse.next();
  }
  if (loggedIn) {
    if (JSON.parse(user.value).role == handlePage) {
      if (openRoutes.filter((route) => pathname.endsWith(route)).length == 0) {
        return NextResponse.next();
      }
      if (handlePage == "teacher") {
        req.nextUrl.pathname = `/${handlePage}/teams`;
      } else {
        req.nextUrl.pathname = `/${handlePage}/dashboard`;
      }
      return NextResponse.redirect(req.nextUrl);
    } else {
      req.nextUrl.pathname = `/`;
      return NextResponse.redirect(req.nextUrl);
    }
  } else {
    if (openRoutes.filter((route) => pathname.endsWith(route)).length > 0) {
      return NextResponse.next();
    }
    req.nextUrl.pathname = `/${handlePage}/login`;
    return NextResponse.redirect(req.nextUrl);
  }
}
