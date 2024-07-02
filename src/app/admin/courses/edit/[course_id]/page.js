"use client";
import { useEffect, useState } from "react";
import * as admin_client from "../../../../(clients)/admin/course_client";
import { useParams, useRouter } from "next/navigation";

export default function EditCourse() {
  const router = useRouter();
  const [course, setCourse] = useState({});

  const params = useParams();

  useEffect(() => {
    var course_id = decodeURIComponent(params.course_id);
    admin_client.GetCourse(course_id).then((value) => {
      console.log(value);
      setCourse(value);
    });
  }, []);

  function updateCourse() {
    admin_client.UpdateCourse(course).then((status) => {
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
        disabled={true}
        value={course.course_id}
        onChange={(e) => {
          setCourse({ ...course, course_id: parseInt(e.target.value) });
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
        value={course.course_name}
        onChange={(e) => {
          setCourse({ ...course, course_name: e.target.value });
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
        value={course.course_description}
        onChange={(e) => {
          setCourse({ ...course, course_description: e.target.value });
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
        value={course.credits}
        onChange={(e) => {
          setCourse({ ...course, credits: parseInt(e.target.value) });
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
        value={course.department}
        onChange={(e) => {
          setCourse({ ...course, department: e.target.value });
        }}
      ></input>
      <br></br>
      <button onClick={() => updateCourse()}>Save</button>
    </div>
  );
}
