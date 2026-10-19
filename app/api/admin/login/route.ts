import { getUser } from "@/services/users";
import { compare } from "bcrypt";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import "dotenv/config";
import { NextResponse } from "next/server";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const res = await getUser(email);

    if (res.success) {
      const user = res.payload;

      const passmatch = await compare(password, user.password);

      if (!passmatch)
        return NextResponse.json(
          { success: false, message: "Invalid user credentials." },
          { status: 401 },
        );

      const token = await new SignJWT({ id: user.id, name: user.name })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1d")
        .sign(SECRET_KEY);


      const cookieStore = await cookies();

      cookieStore.set("access_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24,
        path: "/",
      });

      return NextResponse.json({ success: true }, { status: 200 });
    }

    return NextResponse.json(
      { success: false, message: "Invalid user credentials." },
      { status: 401 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error },
      { status: 401 },
    );
  }
}
