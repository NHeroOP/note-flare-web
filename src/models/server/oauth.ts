"use server"

import { createAdminClient } from "./config";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { OAuthProvider } from "node-appwrite";

export async function signInWithGoogle() {
  const { account } = await createAdminClient();

  const origin = headers().get("origin");
  const successUrl = `https://note-flare.nhero.tech/api/oauth`;
  const failureUrl = `https://note-flare.nhero.tech/login`;

  console.log("test 1")

  const redirectUrl = await account.createOAuth2Token(
    OAuthProvider.Google,
    successUrl,
    failureUrl
  );

  console.log("test 2")
  
  return redirect(redirectUrl);
}
