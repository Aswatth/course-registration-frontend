"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function checkAuth() {
  const auth_cookie = cookies().get(process.env.NEXT_PUBLIC_COOKIE_NAME);

  if (auth_cookie == undefined) {
    redirect("/login");
  }
}
