"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export async function checkAuth(authorized_user, email_id) {
  const auth_token = cookies().get(process.env.NEXT_PUBLIC_COOKIE_NAME);

  if (auth_token == undefined) {
    redirect("/login");
  } else {
    const decoded_token = jwtDecode(auth_token.value);
    if (
      decoded_token.user_type != authorized_user ||
      decoded_token.email_id != email_id
    ) {
      redirect("/login");
    }
  }
  return true;
}
