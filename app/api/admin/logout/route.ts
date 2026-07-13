import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const requestCookies = await cookies();

    requestCookies.delete("access_token");

    return NextResponse.json({ message: "Logged out successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Error logging out." });
  }
}
