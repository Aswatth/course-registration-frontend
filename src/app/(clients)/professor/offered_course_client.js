"use server";
import { cookies } from "next/headers";

const API = process.env.NEXT_PUBLIC_API + "/professors";
const COOKIE_NAME = process.env.NEXT_PUBLIC_COOKIE_NAME;

export const GetOfferedCourseByCRN = async (crn) => {
  var body = null;
  try {
    const response = await fetch(API + "/offered_course?crn=" + crn, {
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

export const GetOfferedCourseByProfessor = async (email_id) => {
  var body = null;
  try {
    const response = await fetch(API + "/offered_course?email_id=" + email_id, {
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

export const DeleteOfferedCourse = async (crn) => {
  var body = null;
  try {
    const response = await fetch(API + "/offered_course/" + crn, {
      method: "DELETE",
      headers: {
        Authorization: cookies().get(COOKIE_NAME).value,
      },
    });

    if (response.status != 200) {
      body = await response.json();
    }
  } catch {
    console.log("UNABLE TO DELETE OFFERED COURSE");
  }
  return body;
};

export const GetAvailableCourses = async () => {
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
    console.log("UNABLE TO FETCH AVAILABLE COURSES");
  }
  return body;
};

export const OfferCourse = async (offered_course) => {
  var body = null;
  try {
    const response = await fetch(API + "/offered_course", {
      method: "POST",
      headers: {
        Authorization: cookies().get(COOKIE_NAME).value,
      },
      body: JSON.stringify(offered_course),
    });

    if (response.status != 200) {
      body = await response.json();
    }
  } catch {
    console.log("UNABLE TO OFFER COURSES");
  }
  return body;
};

export const UpdateOfferedCourse = async (offered_course) => {
  var body = null;
  var data = { day_time: offered_course.day_time };
  try {
    const response = await fetch(
      API + "/offered_course/" + offered_course.crn,
      {
        method: "PUT",
        headers: {
          Authorization: cookies().get(COOKIE_NAME).value,
        },
        body: JSON.stringify(data),
      }
    );
    if (response.status != 200) {
      body = await response.json();
    }
  } catch {
    console.log("UNABLE TO UPDATE AVAILABLE COURSES");
  }
  return body;
};
