"use server";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

const API = process.env.NEXT_PUBLIC_API;

export const login = async (credential) => {
  try {
    const response = await fetch(API + "/login", {
      method: "POST",
      body: JSON.stringify(credential),
    });
    if (response.status == 200) {
      const body = await response.json();

      const token = body["token"];
      cookies().set(process.env.NEXT_PUBLIC_COOKIE_NAME, "Bearer " + token);

      const decoded_token = jwtDecode(token);
      const user_type = decoded_token["user_type"].toLowerCase();
      const email_id = decoded_token["email_id"];

      return { status: 200, repsonse: "/" + user_type + "/" + email_id };
    } else if (response.status == 400) {
      return { status: 400, repsonse: "Invalid credentials" };
    } else {
      return { status: 500, response: "Error occured while logging in" };
    }
  } catch {
    console.log("CANNOT LOG IN");
  }
  return { status: 500, response: "Error occured while logging in" };
};
