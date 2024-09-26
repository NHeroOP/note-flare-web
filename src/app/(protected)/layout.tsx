"use client"

import { useAuthStore } from "@/store/Auth";
import { useEffect } from "react";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { verifySession } = useAuthStore()

  useEffect(() => {
    verifySession()
  }, [])

  return (
    <>
      {children}
    </>
  );
}
