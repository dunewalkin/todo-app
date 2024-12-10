import { NextResponse } from "next/server";

export function middleware(req) {
   const token = req.cookies.get("token"); 
   const loginUrl = new URL("/login", req.url);

   if (!token && req.nextUrl.pathname !== "/login") {
      return NextResponse.redirect(loginUrl);
   }

   return NextResponse.next();
}

export const config = {
   matcher: ["/tasks", "/"],
};
