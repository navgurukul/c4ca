import { NextResponse } from "next/server";

const openRoutes = ["/login"];
const partnerRoles = ["superAdmin", "facilitator", "c4caPartner"];

const redirectHandler = (req) => {
  const user = JSON.parse(req.cookies.get("user").value);
  const role = user.role;
  const c4ca_facilitator_id = user.user?.c4ca_facilitator_id;
  switch (role) {
    case "teacher":
      req.nextUrl.pathname = "/teacher/teams";
      break;
    case "student":
      req.nextUrl.pathname = "/student/dashboard";
      break;
    case "superAdmin":
      req.nextUrl.pathname = "/partner";
      break;
    case "facilitator":
      req.nextUrl.pathname = `/partner/teacherList/${c4ca_facilitator_id}`;
      break;
    case "c4caPartner":
      req.nextUrl.pathname = `/partner/facilitator/${c4ca_facilitator_id}`;
      break;
    default:
      req.nextUrl.pathname = "/";
      break;
  }
  console.log("Redirecting to", req.nextUrl.pathname, role);
  return NextResponse.redirect(req.nextUrl);
};

const routeValidator = (req) => {
  const pathname = req.nextUrl.pathname;
  const user = JSON.parse(req.cookies.get("user").value);
  const role = user.role;
  const handlePage = pathname.split("/")[1];
  if (["student", "teacher"].includes(role)) {
    if (role == handlePage) {
      if (
        openRoutes.filter((route) => pathname.endsWith(route)).length == 0 &&
        handlePage == role
      ) {
        return NextResponse.next();
      } else {
        return redirectHandler(req);
      }
    } else {
      return redirectHandler(req);
    }
  } else if (partnerRoles.includes(role)) {
    if (pathname.startsWith("/partner") && role == "superAdmin") {
      return NextResponse.next();
    } else if (
      pathname.startsWith("/partner/teacherList") &&
      role == "facilitator"
    ) {
      return NextResponse.next();
    } else if (
      pathname.startsWith("/partner/facilitator") &&
      role == "c4caPartner"
    ) {
      return NextResponse.next();
    }
    return NextResponse.redirect(req.nextUrl);
  } else {
    return redirectHandler(req);
  }
};

export default async function middleware(req) {
  const { pathname } = req.nextUrl;
  const loggedIn = req.cookies.has("user");
  if (pathname == "/" && loggedIn) {
    return redirectHandler(req);
  }
  if (
    !pathname.startsWith("/teacher") &&
    !pathname.startsWith("/student") &&
    !pathname.startsWith("/partner")
  ) {
    return NextResponse.next();
  }
  if (loggedIn) {
    return routeValidator(req);
  } else {
    if (openRoutes.filter((route) => pathname.endsWith(route)).length > 0) {
      return NextResponse.next();
    }
    req.nextUrl.pathname = `/`;
    return NextResponse.redirect(req.nextUrl);
  }
}
