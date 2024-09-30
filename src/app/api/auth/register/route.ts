import { SESSION_COOKIE, VERIFY_TOKEN_COOKIE } from "@/const";
import { encryptToken } from "@/helper/crypt";
import sendEmail from "@/helper/send";
import { createAdminClient, createSessionClient } from "@/models/server/config";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { ID } from "node-appwrite";

export async function POST(req: NextRequest) {
  const { username, email, password } = await req.json()


  try {
    const { users } = await createAdminClient()
    const userId = ID.unique()
    

    const verifyPageUrl = new URL("/verify", req.nextUrl)

    const verifyToken = Math.floor(100000 + Math.random() * 900000).toString()
    const encryptedToken = encryptToken(verifyToken)
    const expiryDate = new Date();
    expiryDate.setMinutes(expiryDate.getMinutes() + 15);
    cookies().set(VERIFY_TOKEN_COOKIE, encryptedToken, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      expires: expiryDate,
    });

    const res = await sendEmail(email, userId, verifyToken, verifyPageUrl.toString())
    console.log(res)

    const user = await users.create(
      userId,
      email,
      undefined ,
      password,
      username,
    )

    if (!user) {
      return NextResponse.json({
        success: false,
        error: "Failed to create user"
      }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      userId: user.$id,
      error: null
    }, { status: 200 });


  }
  catch (err) {
    console.log("/api/auth/register", err)  
    return NextResponse.json({
      success: false,
      error: "An internal error occured while creating user"
    }, { status: 500 });
  }
}