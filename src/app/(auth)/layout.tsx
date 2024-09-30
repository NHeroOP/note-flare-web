import { Layout } from "@/components";
import React from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <Layout>
        {children}
      </Layout>
    </>
  );
}
