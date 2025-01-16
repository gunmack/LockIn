import React from "react";

import "@/app/styles/globals.css";
import Navbar from "@/components/navbar";
import AuthProvider from "@/app/context/AuthProvider";

export default async function HomeLayout({ children }) {
  return (
    <AuthProvider>
      <main>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          {children}
        </div>
      </main>
    </AuthProvider>
  );
}
