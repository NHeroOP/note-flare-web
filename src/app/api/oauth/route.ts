import { SESSION_COOKIE } from "@/const";
import { createAdminClient } from "@/models/server/config";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");
    const secret = req.nextUrl.searchParams.get("secret");

    if (!userId || !secret) {
      return new NextResponse("OAuth2 did not provide token", { status: 400 });
    }

    const { account } = await createAdminClient();
    const session = await account.createSession(userId, secret);

    if (!session || !session.secret) {
      return new NextResponse("Failed to create session from token", {
        status: 400,
      });
    }

    cookies().set(SESSION_COOKIE, session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    

    const res = NextResponse.redirect(new URL("/home", req.url))
    
    return res;
  
  }
  catch (err) {
    console.log("/api/oauth", err);
    return NextResponse.json({success: false}, { status: 500 });
  }
}