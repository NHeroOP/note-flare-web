import { SESSION_COOKIE, VERIFY_TOKEN_COOKIE } from "@/const";
import { decryptToken } from "@/helper/crypt";
import sendEmail from "@/helper/send";
import { createAdminClient } from "@/models/server/config";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { verificationCode, userId } = await req.json();

  try {
    if (!verificationCode) {
      return NextResponse.json({
        success: false,
        error: "No verification code provided",
      }, { status: 400 });
    }
  
    const verifyToken = req.cookies.get(VERIFY_TOKEN_COOKIE);
  
    if (!verifyToken || !verifyToken.value) {
      return NextResponse.json({
        success: false,
        error: "No verification token found",
      }, { status: 400 });
    }

    const decryptedToken = decryptToken(verifyToken.value);
  
    if (verificationCode !== decryptedToken) {
      return NextResponse.json({
        success: false,
        error: "Invalid verification code",
      }, { status: 400 });
    }

    const { users } = await createAdminClient();
    const user = await users.updateEmailVerification(
      userId, true
    )

    return NextResponse.json({
      success: true,
      error: null,
    }, { status: 200 });
  }
  catch (err) {
    console.error("/api/auth/verify", err);
    return NextResponse.json({
      success: false,
      error: "An internal error occured while verifying user",
    }, { status: 500 });
  }
  
}