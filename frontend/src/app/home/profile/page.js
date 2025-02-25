import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

export default async function Profile() {
  const session = await getServerSession(options);
  return (
    <div>
      <div>
        <h1 className="text-center font-bold py-4 text-2xl">Profile</h1>
        {session && <div>Name: {session.user.name}<br/>
        Email: {session.user.email}</div>}
      </div>
    </div>
  );
}
