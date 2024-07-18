"use server";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

const API = process.env.NEXT_PUBLIC_API;
const COOKIE_NAME = process.env.NEXT_PUBLIC_COOKIE_NAME;

export const UpdatePassword = async (new_password) => {
  var body = null;
  // Get cookies
  const cookie = cookies().get(COOKIE_NAME);

  // Extract user_type and email_id from token
  const decoded_token = jwtDecode(cookie.value.split(" ")[1]);
  var user_type = decoded_token["user_type"].toLowerCase();
  const email_id = decoded_token["email_id"];

  if (user_type != "admin") {
    user_type += "s";
  }

  //Update correct user's password
  try {
    const response = await fetch(
      API + "/" + user_type + "/password/" + email_id,
      {
        method: "PUT",
        headers: {
          Authorization: cookie.value,
        },
        body: JSON.stringify({ new_password: new_password }),
      }
    );
    if (response.status != 200) {
      body = await response.json();
    }
  } catch {
    console.log("CANNOT UPDATE PASSWORD");
  }
  return body;
};
