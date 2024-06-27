import { cookies } from "next/headers";

const API = process.env.NEXT_PUBLIC_API + "/admin";
const COOKIE_NAME = process.env.NEXT_PUBLIC_COOKIE_NAME;

export const GetAllStudents = async () => {
  try {
    const response = await fetch(API + "/students", {
      method: "GET",
      headers: {
        Authorization: cookies().get(COOKIE_NAME).value,
      },
    });
    return response;
  } catch {
    console.log("UNABLE TO FETCH ALL STUDENT DATA");
  }
};

export const GetAllProfessors = async () => {
  try {
    const response = await fetch(API + "/professors", {
      method: "GET",
      headers: {
        Authorization: cookies().get(COOKIE_NAME).value,
      },
    });
    return response;
  } catch {
    console.log("UNABLE TO FETCH ALL PROFESSOR DATA");
  }
};
