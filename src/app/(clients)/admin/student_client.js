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

export const GetStudent = async (email_id) => {
  var body = null;
  try {
    const response = await fetch(API + "/students?email_id=" + email_id, {
      method: "GET",
      headers: {
        Authorization: cookies().get(COOKIE_NAME).value,
      },
    });
    if (response.status == 200) {
      body = await response.json();
    }
  } catch {
    console.log("UNABLE TO FETCH STUDENT DATA");
  }
  return body;
};

export const UpdateStudent = async (student_data) => {
  var body = null;
  try {
    const response = await fetch(API + "/students/" + student_data.email_id, {
      method: "PUT",
      body: JSON.stringify(student_data),
      headers: {
        Authorization: cookies().get(COOKIE_NAME).value,
      },
    });
    return response.status;
  } catch {
    console.log("UNABLE TO UPDATE STUDENT DATA");
  }
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
