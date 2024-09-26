import { SESSION_COOKIE } from "@/const";
import { createAdminClient } from "@/models/server/config";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { AppwriteException } from "node-appwrite";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  try {
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);
  
    cookies().set(SESSION_COOKIE, session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      expires: new Date(session.expire),
    });

    return NextResponse.json({success: true, error: null}, {status: 200})
  }
  catch (error) {
    return NextResponse.json({success: false, error: error instanceof AppwriteException ? error : null}, {status: 500})
  } 


}