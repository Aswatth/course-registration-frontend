"use server";
import { cookies } from "next/headers";

const API = process.env.NEXT_PUBLIC_API + "/admin";
const COOKIE_NAME = process.env.NEXT_PUBLIC_COOKIE_NAME;

export const GetAllStudents = async () => {
  var body = null;
  try {
    const response = await fetch(API + "/students", {
      method: "GET",
      headers: {
        Authorization: cookies().get(COOKIE_NAME).value,
      },
    });
    if (response.status == 200) {
      body = await response.json();
    }
  } catch {
    console.log("UNABLE TO FETCH ALL STUDENT DATA");
  }
  return body;
};

export const DeleteStudent = async (student_email_id) => {
  try {
    const response = await fetch(API + "/students/" + student_email_id, {
      method: "DELETE",
      headers: {
        Authorization: cookies().get(COOKIE_NAME).value,
      },
    });
    if (response.status == 200) {
      throw Error();
    }
  } catch {
    console.log("UNABLE TO DELETE STUDENT DATA");
  }
};
