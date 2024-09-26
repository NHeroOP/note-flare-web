
import { getLoggedInUser } from "@/models/server/config";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await getLoggedInUser();

    if (!user) {
      return NextResponse.json(null, { status: 401 });
    }


    return NextResponse.json({
      "$createdAt": user.$createdAt,
      "$id": user.$id,
      name: user.name,
      email: user.email,
    }, { status: 200 });

  } catch (err) {
    console.log("/api/auth/me", err);
    return NextResponse.json(null, { status: 500 });
  }
}