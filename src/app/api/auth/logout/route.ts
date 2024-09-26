import { SESSION_COOKIE } from "@/const";
import { createSessionClient } from "@/models/server/config";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = cookies().get(SESSION_COOKIE);
    const { account } = await createSessionClient(session);
    cookies().delete(SESSION_COOKIE);

    await account.deleteSession("current");
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.log("/api/auth/logout", err);
    return NextResponse.json({success: false}, { status: 500 });
  }
}