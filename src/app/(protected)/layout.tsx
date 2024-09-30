"use client"

import { useAuthStore } from "@/store/Auth";
import { Suspense, useEffect } from "react";
import Loading from "./home/loading";
import { Layout } from "@/components";

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
    <Layout>
      <Suspense fallback={<Loading />}>
        {children}
      </Suspense>
    </Layout>
  );
}
