import { db, noteCollection } from "@/models/name";
import { createAdminClient } from "../config";
import { IndexType, Permission} from "node-appwrite";
import waitForAttributes from "../helper/waitForAttribute";

export default async function createNoteCollection() {
  const { databases } = await createAdminClient();

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
    databases.createStringAttribute(db, noteCollection, "author", 50, true),
    databases.createStringAttribute(db, noteCollection, "title", 24, true), 
    databases.createStringAttribute(db, noteCollection, "description", 255, true), 
    databases.createStringAttribute(db, noteCollection, "file_url", 255, true), 
    databases.createStringAttribute(db, noteCollection, "subject", 10, true),
    databases.createStringAttribute(db, noteCollection, "tags", 500, false, undefined ,true),
    databases.createIntegerAttribute(db, noteCollection, "likes_count", true, 0),
    databases.createIntegerAttribute(db, noteCollection, "downloads_count", true, 0), 
  ]);

  await waitForAttributes(db, noteCollection, ["subject", "tags", "likes_count", "downloads_count"]);

  // Create indexes for efficient querying
  await Promise.all([
    databases.createIndex(db, noteCollection, "subject", IndexType.Key, ["subject"]),
    databases.createIndex(db, noteCollection, "tags", IndexType.Key, ["tags"]), 
    databases.createIndex(db, noteCollection, "likes_count", IndexType.Key, ["likes_count"]), 
    databases.createIndex(db, noteCollection, "downloads_count", IndexType.Key, ["downloads_count"]),
    databases.createIndex(db, noteCollection, "createdAt", IndexType.Key, ["$createdAt"]),
  ]);
}