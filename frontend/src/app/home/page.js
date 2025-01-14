import React from "react";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(options);
  return (
    <>
      {session ? (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          Hello, {session.user.name}! This is the home page.
        </div>
      ) : (
        redirect("./")
      )}
    </>
  );
}
