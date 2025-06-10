import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import TaskList from "@/app/home/tasks/list";
import TaskPanel from "@/app/home/tasks/panel";

async function getUserName() {
  const session = await getServerSession(options);
  return session.user.name;
}

export default function Tasks() {
  const user = getUserName();

  return (
    <div className=" w-full min-h-[70vh]  text-black ">
      <div>
        <div className="flex flex-col bg-neutral-200 rounded-lg p-4">
          {/* <TaskList userName={session.user.name} /> */}
          {/* <h1 className="text-center font-bold text-2xl">
            {user}&apos;s Tasks
          </h1> */}
          <TaskPanel />
        </div>
      </div>
    </div>
  );
}
