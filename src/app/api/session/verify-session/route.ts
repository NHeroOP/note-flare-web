import { SESSION_COOKIE } from "@/const";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = cookies().get(SESSION_COOKIE)  
    
    if (!session || !session.value) {
      return NextResponse.json({ success: false }, { status: 401 })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  
  }
  catch (err) {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}