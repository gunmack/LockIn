import React from "react";

import "@/app/styles/globals.css";
import Navbar from "@/components/navbar";

export default async function HomeLayout({ children }) {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
}
