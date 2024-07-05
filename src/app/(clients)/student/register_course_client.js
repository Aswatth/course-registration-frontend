"use server";
import { cookies } from "next/headers";

const API = process.env.NEXT_PUBLIC_API + "/students";
const COOKIE_NAME = process.env.NEXT_PUBLIC_COOKIE_NAME;

export const GetAllOfferedCourses = async () => {
  var body = null;
  try {
    const response = await fetch(API + "/offered_courses", {
      method: "GET",
      headers: {
        Authorization: cookies().get(COOKIE_NAME).value,
      },
    });
    if (response.status == 200) {
      body = await response.json();
    }
  } catch {
    console.log("UNABLE TO FETCH OFFERED COURSES");
  }
  return body;
};
