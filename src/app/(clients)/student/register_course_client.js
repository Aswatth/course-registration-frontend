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

export const GetRegisteredCourses = async (email_id) => {
  var body = null;
  try {
    const response = await fetch(
      API + "/register_course?email_id=" + email_id,
      {
        method: "GET",
        headers: {
          Authorization: cookies().get(COOKIE_NAME).value,
        },
      }
    );
    if (response.status == 200) {
      body = await response.json();
    }
  } catch {
    console.log("UNABLE TO REGISTER COURSES");
  }
  return body;
};

export const RegisterCourses = async (registered_courses) => {
  try {
    const response = await fetch(API + "/register_course", {
      method: "POST",
      headers: {
        Authorization: cookies().get(COOKIE_NAME).value,
      },
      body: JSON.stringify(registered_courses),
    });
    return await response.json();
  } catch {
    console.log("UNABLE TO REGISTER COURSES");
  }
};
