import { db } from "../name";
import { databases } from "./config";

import {
  createCommentCollection,
  createLikeCollection,
  createUserCollection,
  createNoteCollection
} from "./index"

export default async function getOrCreateDB() {
  try {
    await databases.get(db);
    console.log("Database connected");
  }
  catch (error) {
    try {
      await databases.create(db, db);
      console.log("Database created");

      // Create collections
      await Promise.all([
        createUserCollection(),
        createNoteCollection(),
        createLikeCollection(),
        createCommentCollection(),
      ])
      console.log("Collections created");
      console.log("Database connected");
    }
    catch (error) {
      console.log("Error creating database", error);
    }
  }

  return databases;
}