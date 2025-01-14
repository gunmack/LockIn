import React from "react";

import "@/app/styles/globals.css";
import Navbar from "@/components/navbar";
import AuthProvider from "@/app/context/AuthProvider";

export default async function HomeLayout({ children }) {
  return (
    <AuthProvider>
      <main>
        <Navbar />
        {children}
      </main>
    </AuthProvider>
  );
}
