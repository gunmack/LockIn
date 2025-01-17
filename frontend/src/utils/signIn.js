import { redirect } from "next/navigation";
export default function SignIn() {
  redirect("/api/auth/signin?callbackUrl=/home/feed");
}
