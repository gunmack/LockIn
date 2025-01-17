import React from "react";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(options);
  return (
    <>
      <div>Hello, {session.user.name}! Welcome to your feed.</div>
    </>
  );
}
