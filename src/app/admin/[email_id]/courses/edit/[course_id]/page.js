"use client";
import { useEffect, useState } from "react";
import * as admin_client from "@/app/(clients)/admin/course_client";
import { useParams, useRouter } from "next/navigation";

import style from "./edit_course.module.css";

export default function EditCourse() {
  const router = useRouter();
  const [course, setCourse] = useState({});

  const params = useParams();

  useEffect(() => {
    var course_id = decodeURIComponent(params.course_id);
    admin_client.GetCourse(course_id).then((value) => {
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
    <div className={style["page"]}>
      <div className={style["header"]}>
        <button onClick={() => router.back()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-chevron-compact-left"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M9.224 1.553a.5.5 0 0 1 .223.67L6.56 8l2.888 5.776a.5.5 0 1 1-.894.448l-3-6a.5.5 0 0 1 0-.448l3-6a.5.5 0 0 1 .67-.223"
            />
          </svg>
        </button>
        <h1>Edit course</h1>
      </div>

      <div className={style["content"]}>
        <div className={style["input-decoration"]}>
          <input
            type="number"
            id="course_id"
            name="course_id"
            required={true}
            contentEditable={false}
            contet
            disabled={true}
            value={course.course_id}
          ></input>
          <span>Course ID</span>
        </div>

        <div className={style["input-decoration"]}>
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
          <span>Course name</span>
        </div>

        <div className={style["input-decoration"]}>
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
          <span>Course description</span>
        </div>
        <div className={style["input-decoration"]}>
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
          <span>Credits</span>
        </div>
        <div className={style["input-decoration"]}>
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
          <span>Department</span>
        </div>
        <button className={style["save-course"]} onClick={() => updateCourse()}>
          Save
        </button>
      </div>
    </div>
  );
}
