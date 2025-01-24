import "@/app/styles/globals.css";
import Navbar from "@/components/navbar";
import AuthProvider from "@/app/context/AuthProvider";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function HomeLayout({ children }) {
  const session = await getServerSession();
  if (!session) {
    redirect("/");
  }

  return (
    <AuthProvider>
      <main>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-w-screen min-h-screen py-2">
          {children}
        </div>
      </main>
    </AuthProvider>
  );
}
