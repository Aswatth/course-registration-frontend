"use server";
import { cookies } from "next/headers";

const API = process.env.NEXT_PUBLIC_API + "/admin";
const COOKIE_NAME = process.env.NEXT_PUBLIC_COOKIE_NAME;

export const GetAllProfessors = async () => {
  var body = null;
  try {
    const response = await fetch(API + "/professors", {
      method: "GET",
      headers: {
        Authorization: cookies().get(COOKIE_NAME).value,
      },
    });
    if (response.status == 200) {
      body = await response.json();
    }
  } catch {
    console.log("UNABLE TO FETCH ALL PROFESSOR DATA");
  }
  return body;
};

export const DeleteProfessor = async (professor_email_id) => {
  try {
    const response = await fetch(API + "/professors/" + professor_email_id, {
      method: "DELETE",
      headers: {
        Authorization: cookies().get(COOKIE_NAME).value,
      },
    });
    if (response.status == 200) {
      throw Error();
    }
  } catch {
    console.log("UNABLE TO DELETE PROFESSOR DATA");
  }
};
