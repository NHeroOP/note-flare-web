"use server"

import { createAdminClient } from "./config";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { OAuthProvider } from "node-appwrite";

export async function signInWithGoogle() {
  const { account } = await createAdminClient();

  const origin = headers().get("origin");
  const successUrl = `${origin}/api/oauth`;
  const failureUrl = `${origin}/login`;

  console.log("test 1")
  console.log("google oauth", OAuthProvider.Google)

  const redirectUrl = await account.createOAuth2Token(
    OAuthProvider.Google,
    successUrl,
    failureUrl
  );

  console.log("test 2")
  
  return redirect(redirectUrl);
}
