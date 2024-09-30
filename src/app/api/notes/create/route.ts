import { SESSION_COOKIE } from "@/const";
import env from "@/env";
import { db, noteAttachmentBucket, noteCollection } from "@/models/name";
import { createSessionClient } from "@/models/server/config";
import { NextRequest, NextResponse } from "next/server";
import { ID } from "node-appwrite";

let file_id = ""

export async function POST(req:NextRequest) {
  try {
    const data = await req.formData()
    console.log("/api/notes/create", data) ;

    const title = data.get("title")
    const description = data.get("description")
    const subject = data.get("subject")
    const file = data.get("file") as File
    const tags = data.getAll("tags[]")
    
    console.log("/api/notes/create tags", tags)


    if (!tags) {
      const tags = []
    }

    if (!title || !description || !subject || !file) {
      return NextResponse.json({
        success: false,
        error: "Required fields are missing"
      }, { status: 400 })
    }

    const session = req.cookies.get(SESSION_COOKIE)  

    if (!session || !session.value) {
      return NextResponse.json({
        success: false,
        error: "Unauthorized"
      }, { status: 401})
    }

    
    const { databases, account, storage } = await createSessionClient(session)
    const user = await account.get()
    console.log("test1")
    const author = user.name
    console.log("test2")
    
    // storage.createFile
    
    const noteFile = await storage.createFile(noteAttachmentBucket, ID.unique(), file)
    file_id = noteFile.$id
    const { endpoint, projectId } = env.appwrite
    const file_url = `${endpoint}/storage/buckets/${noteAttachmentBucket}/files/${file_id}/view?project=${projectId}`
    console.log("test3", {
      author, title, description, subject, tags,
      likes_count: 0, downloads_count: 0, file_url
    })
    

    const note = await databases.createDocument(
      db, noteCollection, ID.unique(), {
        title, author, description, subject, tags,
        likes_count: 0, downloads_count: 0, file_url
      }
    )

    console.log("test4")

    return NextResponse.json({
      success: true,
      message: "Note has been successfully created",
      note_id: note.$id
    }, {status: 201})


  }
  catch (err: any) {
    console.log("/api/notes/create error", err)

    if (file_id) {
      const { storage } = await createSessionClient(req.cookies.get(SESSION_COOKIE))
      await storage.deleteFile(noteAttachmentBucket, file_id)
    }

    return NextResponse.json({
      success: false,
      error: err.message || "An internal error occured while creating note"
    }, {status: 500})
  }

}