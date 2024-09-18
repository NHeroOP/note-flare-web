import { db, noteCollection } from "@/models/name";
import { databases } from "../config";
import { IndexType, Permission} from "node-appwrite";

export default async function createNoteCollection() {
  await databases.createCollection(
    db,
    noteCollection,
    noteCollection,
    [
      Permission.read("any"), 
      Permission.create("users"),
      Permission.read("users"), 
      Permission.update("users"), 
      Permission.delete("users"), 
    ]
  );

  // Create attributes for the notes
  await Promise.all([
    databases.createStringAttribute(db, noteCollection, "user_id", 255, true),
    databases.createStringAttribute(db, noteCollection, "title", 255, true), 
    databases.createStringAttribute(db, noteCollection, "description", 255, true), 
    databases.createStringAttribute(db, noteCollection, "file_url", 255, true), 
    databases.createStringAttribute(db, noteCollection, "subject", 255, true),
    databases.createStringAttribute(db, noteCollection, "tags", 500, false), 
    databases.createIntegerAttribute(db, noteCollection, "likes_count", true),
    databases.createIntegerAttribute(db, noteCollection, "downloads_count", true), 
  ]);


  // Create indexes for efficient querying
  await Promise.all([
    databases.createIndex(db, noteCollection, "subject", IndexType.Key, ["subject"]),
    databases.createIndex(db, noteCollection, "tags", IndexType.Key, ["tags"]), 
    databases.createIndex(db, noteCollection, "likes_count", IndexType.Key, ["likes_count"]), 
    databases.createIndex(db, noteCollection, "downloads_count", IndexType.Key, ["downloads_count"]),
  ]);
}