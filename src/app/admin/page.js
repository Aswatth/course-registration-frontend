import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";

export default function AdminHome() {
  const checkAuth = () => {
    const auth_cookie = cookies().get(process.env.NEXT_PUBLIC_COOKIE_NAME);

    console.log("checking auth");
    if (auth_cookie == undefined) {
      redirect("/login");
    }
  };

  checkAuth();
  return (
    <div>
      <Link href={"/admin/students"}>Students</Link>
    </div>
  );
}
