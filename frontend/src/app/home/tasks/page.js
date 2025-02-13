import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import TaskList from "@/app/home/tasks/list";

export default async function Tasks() {
  const session = await getServerSession(options);
  return (
    <div className=" w-2/4 ">
      <div className="bg-gray-600 py-8  rounded-lg">
        <div>
          <TaskList userName={session.user.name} />
        </div>
      </div>
    </div>
  );
}
