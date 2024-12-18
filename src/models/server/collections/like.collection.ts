import { likeCollection, db } from "@/models/name"
import { createAdminClient } from "../config"
import { IndexType, Permission } from "node-appwrite"
import waitForAttributes from "../helper/waitForAttribute"

export default async function createLikeCollection() {
  const { databases } = await createAdminClient()

  // Creating collection
  await databases.createCollection(db, likeCollection, likeCollection, [
    Permission.read("any"),
    Permission.create("users"),
    Permission.read("users"),
    Permission.update("users"),
    Permission.delete("users"),
  ])

  // Creating Attributes
  await Promise.all([
    databases.createStringAttribute(db, likeCollection, "note_id", 500, true),
    databases.createStringAttribute(db, likeCollection, "user_id", 50, true),
  ])

  await waitForAttributes(db, likeCollection, ["note_id", "user_id"])

  // Creating Indexes
  await Promise.all([
    databases.createIndex(db, likeCollection, "note_id", IndexType.Unique, ["note_id"]),
    databases.createIndex(db, likeCollection, "user_id", IndexType.Unique, ["user_id"]),
  ])
}