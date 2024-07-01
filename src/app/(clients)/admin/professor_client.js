"use server";
import { cookies } from "next/headers";

const API = process.env.NEXT_PUBLIC_API + "/admin";
const COOKIE_NAME = process.env.NEXT_PUBLIC_COOKIE_NAME;

export const CreateProfessor = async (professor_data) => {
  try {
    const response = await fetch(API + "/professors", {
      method: "POST",
      body: JSON.stringify(professor_data),
      headers: {
        Authorization: cookies().get(COOKIE_NAME).value,
      },
    });
    return response.status;
  } catch {
    console.log("UNABLE TO CREATE NEW PROFESSOR PROFILE");
  }
};

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

export const GetProfessor = async (email_id) => {
  var body = null;
  try {
    const response = await fetch(API + "/professors?email_id=" + email_id, {
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

export const UpdateProfessor = async (professor_data) => {
  var body = null;
  try {
    const response = await fetch(
      API + "/professors/" + professor_data.email_id,
      {
        method: "PUT",
        body: JSON.stringify(professor_data),
        headers: {
          Authorization: cookies().get(COOKIE_NAME).value,
        },
      }
    );
    return response.status;
  } catch {
    console.log("UNABLE TO UPDATE PROFESSOR DATA");
  }
};

export const DeleteProfessor = async (professor_email_id) => {
  try {
    const response = await fetch(API + "/professors/" + professor_email_id, {
      method: "DELETE",
      headers: {
        Authorization: cookies().get(COOKIE_NAME).value,
      },
    });
    if (response.status != 200) {
      throw Error();
    }
  } catch {
    console.log("UNABLE TO DELETE PROFESSOR DATA");
  }
};
