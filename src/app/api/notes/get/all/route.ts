import { db, noteCollection } from "@/models/name";
import { createAdminClient } from "@/models/server/config";
import {NextRequest, NextResponse } from "next/server";
import { Query } from "node-appwrite";

export async function GET(req: NextRequest) {
  const { databases } = await createAdminClient(); 
  
  try {
    const lastId = req.nextUrl.searchParams.get("lastId") || ""
    const query = [
      Query.orderDesc("$createdAt"),
      Query.limit(10)
    ]

    if (lastId) {
      query.push(Query.cursorAfter(lastId))
    }

    const notes = await databases.listDocuments(
      db,
      noteCollection,
      query
    );


    if (!notes) {
      return NextResponse.json({
        success: false,
        error: "No notes found"
      }, { status: 404 });
    }

    const notesList = notes.documents.map((note) => ({
      id: note["$id"],
      createdAt: note["$createdAt"],
      author: note.author,
      title: note.title,
      tags: note.tags,
      description: note.description,
      subject: note.subject,
      downloads_count: note.downloads_count,
      likes_count: note.likes_count,
      file_url: note.file_url,
    }))
    
    return NextResponse.json({
      success: true,
      notes: notesList
    }, { status: 200 });
    

  }
  catch (error: any) {
    return NextResponse.json({
      success: false,
      error: "Internal Server Error"
    }, { status: 500 });
  }

}