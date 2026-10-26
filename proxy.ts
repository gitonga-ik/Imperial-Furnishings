import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import "dotenv/config";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

export default async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }
  
  const loginUrl = new URL("/admin/login", request.url);

  try {
    const token = request.cookies.get("access_token");

    if (!token || !token.value) {
      return NextResponse.redirect(loginUrl);
    }

    const result = await verifyAuth(token.value);

    if (result && result.success) {
      return NextResponse.next();
    }
    return NextResponse.redirect(loginUrl);
  } catch (error) {
    console.error("Middleware Auth Error:", error);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};

async function verifyAuth(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY, {
      algorithms: ["HS256"],
    });
    return { success: true, payload: payload };
  } catch (error) {
    return { success: false, message: error };
  }
}
''