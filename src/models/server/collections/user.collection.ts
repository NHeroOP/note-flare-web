import { userCollection, db } from "@/models/name"
import { databases } from "../config"
import { IndexType, Permission } from "node-appwrite"
import waitForAttributes from "../helper/waitForAttribute"

export default async function createUserCollection() {
  // Creating collection
  await databases.createCollection(db, userCollection, userCollection, [
    Permission.read("any"),
    Permission.create("users"),
    Permission.read("users"),
    Permission.update("users"),
    Permission.delete("users"),
  ])

  // Creating Attributes
  await Promise.all([
    databases.createStringAttribute(db, userCollection, "email", 50, true),
    databases.createStringAttribute(db, userCollection, "name", 24, true),
  ])

  await waitForAttributes(db, userCollection, ["email"])

  // Creating Indexes
  await Promise.all([
    databases.createIndex(db, userCollection, "email", IndexType.Unique, ["email"]),
    databases.createIndex(db, userCollection, "createdAt", IndexType.Unique, ["$createdAt"]),
  ])
}