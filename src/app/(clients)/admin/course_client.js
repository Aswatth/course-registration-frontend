"use server";
import { cookies } from "next/headers";

const API = process.env.NEXT_PUBLIC_API + "/admin";
const COOKIE_NAME = process.env.NEXT_PUBLIC_COOKIE_NAME;

export const GetCourse = async (course_id) => {
  var body = null;
  try {
    const response = await fetch(API + "/courses?course_id=" + course_id, {
      method: "GET",
      headers: {
        Authorization: cookies().get(COOKIE_NAME).value,
      },
    });
    console.log(response);
    if (response.status == 200) {
      body = await response.json();
      console.log(body);
    }
  } catch {
    console.log("UNABLE TO FETCH ALL COURSE DATA");
  }
  return body;
};

export const GetAllCourses = async () => {
  var body = null;
  try {
    const response = await fetch(API + "/courses", {
      method: "GET",
      headers: {
        Authorization: cookies().get(COOKIE_NAME).value,
      },
    });
    if (response.status == 200) {
      body = await response.json();
    }
  } catch {
    console.log("UNABLE TO FETCH ALL COURSE DATA");
  }
  return body;
};

export const CreateCourse = async (new_course) => {
  try {
    const response = await fetch(API + "/courses", {
      method: "POST",
      headers: {
        Authorization: cookies().get(COOKIE_NAME).value,
      },
      body: JSON.stringify(new_course),
    });
    return response.status;
  } catch {
    console.log("UNABLE TO CREATE NEW COURSE");
  }
  return null;
};

export const UpdateCourse = async (course) => {
  try {
    const response = await fetch(API + "/courses/" + course.course_id, {
      method: "PUT",
      headers: {
        Authorization: cookies().get(COOKIE_NAME).value,
      },
      body: JSON.stringify(course),
    });
    return response.status;
  } catch {
    console.log("UNABLE TO UPDATE COURSE");
  }
  return null;
};

export const DeleteCourse = async (course_id) => {
  try {
    const response = await fetch(API + "/courses/" + course_id, {
      method: "DELETE",
      headers: {
        Authorization: cookies().get(COOKIE_NAME).value,
      },
    });
    return response.status;
  } catch {
    console.log("UNABLE TO DELETE COURSE DATA");
  }
  return null;
};
