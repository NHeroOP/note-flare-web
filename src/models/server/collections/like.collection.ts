import { likeCollection, db } from "@/models/name"
import { databases } from "../config"
import { IndexType, Permission } from "node-appwrite"

export default async function createLikeCollection() {
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

  // Creating Indexes
  await Promise.all([
    databases.createIndex(db, likeCollection, "note_id", IndexType.Unique, ["note_id"]),
    databases.createIndex(db, likeCollection, "user_id", IndexType.Unique, ["user_id"]),
  ])
}