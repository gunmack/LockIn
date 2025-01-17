import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import DisplayTasks from "@/app/home/tasks/list";

export default async function Tasks() {
  const session = await getServerSession(options);
  return (
    <div>
      <div className="bg-gray-600 py-8 px-16 rounded-lg">
        <h1 className="text-center font-bold py-4 text-2xl">
          {session.user.name}&apos;s Tasks
        </h1>
        <div>
          <DisplayTasks />
        </div>
      </div>
    </div>
  );
}
