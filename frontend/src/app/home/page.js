"use client";
import { getSession } from "next-auth/react";
import { SessionProvider } from "next-auth/react";

import { useEffect, useState } from "react";

function HomePage() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    async function fetchSession() {
      const sessionData = await getSession();
      setSession(sessionData);
    }
    fetchSession();
  }, []);

  return (
    <SessionProvider session={session}>
      <div>Welcome to the Home Page</div>
    </SessionProvider>
  );
}

export default HomePage;
