import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import TaskList from "@/app/home/tasks/list";

export default async function Tasks() {
  const session = await getServerSession(options);
  return (
    <div className=" w-3/4 ">
      <div className="bg-gray-600 py-8 px-16  rounded-lg">
        <h1 className="text-center font-bold py-8 text-2xl">
          {session.user.name}&apos;s Tasks
        </h1>
        <div>
          <TaskList />
        </div>
      </div>
    </div>
  );
}
