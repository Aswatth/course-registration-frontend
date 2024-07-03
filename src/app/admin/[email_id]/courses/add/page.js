"use client";
import { useState } from "react";
import * as admin_client from ".@/app/(clients)/admin/course_client";
import { useRouter } from "next/navigation";

export default function AddCourse() {
  const router = useRouter();
  const [new_course, setCourse] = useState({});

  function createNewCourse() {
    admin_client.CreateCourse(new_course).then((status) => {
      if (status == 200) {
        router.back();
      } else {
        alert("Error occured while creating a new course");
      }
    });
  }

  return (
    <div>
      Add new course
      <br></br>
      <label htmlFor="course_id">Course Id:</label>
      <br></br>
      <input
        type="number"
        id="course_id"
        name="course_id"
        required={true}
        onChange={(e) => {
          setCourse({ ...new_course, course_id: parseInt(e.target.value) });
        }}
      ></input>
      <br></br>
      <label htmlFor="course_name">Course name:</label>
      <br></br>
      <input
        type="text"
        id="course_name"
        name="course_name"
        required={true}
        onChange={(e) => {
          setCourse({ ...new_course, course_name: e.target.value });
        }}
      ></input>
      <br></br>
      <label htmlFor="course_description">Course description:</label>
      <br></br>
      <input
        type="text"
        id="course_description"
        name="course_description"
        required={true}
        onChange={(e) => {
          setCourse({ ...new_course, course_description: e.target.value });
        }}
      ></input>
      <br></br>
      <label htmlFor="credits">Credits:</label>
      <br></br>
      <input
        type="number"
        id="credits"
        name="credits"
        required={true}
        onChange={(e) => {
          setCourse({ ...new_course, credits: parseInt(e.target.value) });
        }}
      ></input>
      <br></br>
      <label htmlFor="department">Department:</label>
      <br></br>
      <input
        type="text"
        id="department"
        name="department"
        required={true}
        onChange={(e) => {
          setCourse({ ...new_course, department: e.target.value });
        }}
      ></input>
      <br></br>
      <button onClick={() => createNewCourse()}>Create new course</button>
    </div>
  );
}
