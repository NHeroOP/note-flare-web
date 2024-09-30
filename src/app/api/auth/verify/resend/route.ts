import { SESSION_COOKIE, VERIFY_TOKEN_COOKIE } from "@/const";
import { encryptToken } from "@/helper/crypt";
import sendEmail from "@/helper/send";
import { createAdminClient } from "@/models/server/config";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId } = await req.json();

  try {
    const verifyToken = req.cookies.get(VERIFY_TOKEN_COOKIE);
  
    if (!verifyToken || !verifyToken.value) {
      
      const verifyToken = Math.floor(100000 + Math.random() * 900000).toString()
      const encryptedToken = encryptToken(verifyToken)


      const expiryDate = new Date();
      expiryDate.setSeconds(expiryDate.getSeconds() + 40);
      cookies().set(VERIFY_TOKEN_COOKIE, encryptedToken, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        expires: expiryDate,
      });

      const { users } = await createAdminClient()
      const user = await users.get(userId)

      if (user.emailVerification) {
        return NextResponse.json({
          success: false,
          error: "User is already verified",
        }, { status: 400 });
      }

      const verifyPageUrl = new URL("/verify", req.nextUrl)
      await sendEmail(user.email, userId, verifyToken, verifyPageUrl.toString())

      return NextResponse.json({
        success: true,
        error: null
      }, { status: 200 });
    }
  

    return NextResponse.json({
      success: false,
      error: "Verification token already exists",
    }, { status: 400 })
  }
  catch (err) {
    console.error("/api/auth/verify", err);
    return NextResponse.json({
      success: false,
      error: "An internal error occured while verifying user",
    }, { status: 500 });
  }
  
}