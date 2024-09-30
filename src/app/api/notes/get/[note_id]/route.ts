import { SESSION_COOKIE } from "@/const";
import { db, noteCollection } from "@/models/name";
import { createSessionClient } from "@/models/server/config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params } : { params: { note_id: string } }) {
  const { note_id } = params;

  if (!note_id) {
    return NextResponse.json({
      success: false,
      error: "Note ID is required"
    }, { status: 400 });
  }

  try {

    const session = req.cookies.get(SESSION_COOKIE);
    if (!session || !session.value) { 
      return NextResponse.json({
        success: false,
        error: "Session cookie is required"
      }, { status: 401 });
    }

    const { databases } = await createSessionClient(session)

    const noteRes = await databases.getDocument(
      db, noteCollection, note_id
    )
    
    if (!noteRes) {
      return NextResponse.json({
        success: false,
        error: "Note not found"
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      note: {
        id: noteRes["$id"],
        createdAt: noteRes["$createdAt"],
        author: noteRes.author,
        title: noteRes.title,
        tags: noteRes.tags,
        description: noteRes.description,
        subject: noteRes.subject,
        downloads_count: noteRes.downloads_count,
        likes_count: noteRes.likes_count,
        file_url: noteRes.file_url,
      }
    }, { status: 200 });

  }
  catch (err) {
    console.log("/notes/get/[note_id] error", err)

    return NextResponse.json({
      success: false,
      error: "Internal Server Error"
    }, { status: 500 });
  }
}