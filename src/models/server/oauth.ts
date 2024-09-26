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

  const redirectUrl = await account.createOAuth2Token(
    OAuthProvider.Google,
    successUrl,
    failureUrl
  );

  redirect(redirectUrl);
}