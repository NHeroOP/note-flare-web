import { commentCollection, db } from "@/models/name";
import { IndexType, Permission } from "node-appwrite";
import waitForAttributes from "../helper/waitForAttribute";
import { createAdminClient } from "../config";

export default async function createCommentCollection() {
  const { databases } = await createAdminClient()
  
  // Creating collection
  await databases.createCollection(db, commentCollection, commentCollection, [
    Permission.read("any"),
    Permission.create("users"),
    Permission.read("users"),
    Permission.update("users"),
    Permission.delete("users"),
  ])

  // Creating Attributes
  await Promise.all([
    databases.createStringAttribute(db, commentCollection, "content", 500, true),
    databases.createStringAttribute(db, commentCollection, "author_id", 50, true),
    databases.createStringAttribute(db, commentCollection, "note_id", 50, true),  
  ])

  await waitForAttributes(db, commentCollection, ["note_id"])

  // Creating Indexes
  await Promise.all([
    databases.createIndex(db, commentCollection, "note_id", IndexType.Key, ["note_id"]),
    databases.createIndex(db, commentCollection, "createdAt", IndexType.Key, ["$createdAt"], ["desc"]),
  ])
}