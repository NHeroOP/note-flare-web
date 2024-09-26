import { Permission } from "node-appwrite";
import { noteAttachmentBucket } from "../name";
import { createAdminClient } from "./config";

export default async function getOrCreateStorage() {
  const { storage } = await createAdminClient()

  try {
    await storage.getBucket(noteAttachmentBucket);
    console.log("Storage Connected");
  }
  catch (error) {
    try {
      await storage.createBucket(
        noteAttachmentBucket,
        noteAttachmentBucket,
        [
          Permission.create("users"),
          Permission.read("any"),
          Permission.read("users"),
          Permission.update("users"),
          Permission.delete("users"),
        ],
        false, undefined, undefined,
        ["pdf", "doc", "docx", "ppt", "pptx", "txt", "md", "jpg", "jpeg", "png"]
      );

      console.log("Storage Created");
      console.log("Storage Connected");
    }
    catch (error) {
      console.error("Error creating storage:", error);
    }
  }
}