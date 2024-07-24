"use server";
import { cookies } from "next/headers";

const API = process.env.NEXT_PUBLIC_API + "/professors";
const COOKIE_NAME = process.env.NEXT_PUBLIC_COOKIE_NAME;

export const GetProfessorProfile = async (email_id) => {
  var body = null;
  try {
    const response = await fetch(API + "/" + email_id, {
      method: "GET",
      headers: {
        Authorization: cookies().get(COOKIE_NAME).value,
      },
    });

    body = await response.json();
  } catch {
    console.log("UNABLE TO FETCH OFFERED COURSES");
  }
  return body;
};
