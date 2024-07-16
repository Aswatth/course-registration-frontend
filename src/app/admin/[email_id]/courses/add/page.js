"use client";
import { useState } from "react";
import * as admin_client from "@/app/(clients)/admin/course_client";
import { useRouter } from "next/navigation";

import style from "./add_courses.module.css";
import toast from "react-hot-toast";

export default function AddCourse() {
  const router = useRouter();
  const [new_course, setCourse] = useState({});

  function createNewCourse() {
    admin_client.CreateCourse(new_course).then((status) => {
      if (status == 200) {
        toast.success("Successfully create a new course!");
        router.back();
      } else {
        toast.error("Error occured while creating a new course");
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
        <h1>Add new course</h1>
      </div>
      <div className={style["content"]}>
        <div className={style["input-decoration"]}>
          <input
            type="number"
            id="course_id"
            name="course_id"
            required={true}
            onChange={(e) => {
              setCourse({ ...new_course, course_id: parseInt(e.target.value) });
            }}
          ></input>
          <span>Course ID</span>
        </div>
        <div className={style["input-decoration"]}>
          <input
            type="text"
            id="course_name"
            name="course_name"
            required={true}
            onChange={(e) => {
              setCourse({ ...new_course, course_name: e.target.value });
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
            onChange={(e) => {
              setCourse({ ...new_course, course_description: e.target.value });
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
            onChange={(e) => {
              setCourse({ ...new_course, credits: parseInt(e.target.value) });
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
            onChange={(e) => {
              setCourse({ ...new_course, department: e.target.value });
            }}
          ></input>
          <span>Department</span>
        </div>

        <button
          className={style["create-course"]}
          onClick={() => createNewCourse()}
        >
          Create new course
        </button>
      </div>
    </div>
  );
}
