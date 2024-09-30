import { Layout } from "@/components";
import React, { Suspense } from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <Layout>
        <Suspense fallback={
          <div className="h-full flex flex-grow justify-center items-center">
            <span className="loading loading-bars w-48"></span>
          </div>
        }>
          {children}
        </Suspense>
      </Layout>
    </>
  );
}
