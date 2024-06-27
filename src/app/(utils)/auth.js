import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const checkAuth = () => {
  const auth_cookie = cookies().get(process.env.NEXT_PUBLIC_COOKIE_NAME);

  console.log("checking auth");
  if (auth_cookie == undefined) {
    redirect("/login");
  }
};
