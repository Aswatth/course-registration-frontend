"use client";
import { useRouter } from "next/navigation";
import * as admin_client from "@/app/(clients)/admin/student_client";

import { useState } from "react";

import style from "./add_student.module.css";
import toast from "react-hot-toast";
import { PROGRAM_LIST } from "@/app/(utils)/constants";

export default function AddStudent() {
  const router = useRouter();
  const [student_data, setStudentData] = useState({});

  function createNewStudent() {
    var student_form_data = Object.keys(student_data);

    if (
      !student_form_data.includes("first_name") ||
      student_data.first_name == ""
    ) {
      toast.error("First name cannot be empty");
      return;
    } else if (
      !student_form_data.includes("last_name") ||
      student_data.last_name == ""
    ) {
      toast.error("Last name cannot be empty");
      return;
    } else if (
      !student_form_data.includes("email_id") ||
      student_data.email_id == ""
    ) {
      toast.error("Email Id cannot be empty");
      return;
    } else if (
      !student_form_data.includes("password") ||
      student_data.password == ""
    ) {
      toast.error("Password cannot be empty");
      return;
    } else if (
      !student_form_data.includes("program_enrolled") ||
      student_data.program_enrolled == ""
    ) {
      toast.error("Program enrolled cannot be empty");
      return;
    }

    admin_client.CreateStudent(student_data).then((response) => {
      if (response == null || response == undefined) {
        toast.success("Successfully created a new student profile!");
        router.back();
      } else {
        toast.error(response["response"]);
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
        <h1>Add student</h1>
      </div>
      <div className={style["content"]}>
        <div className={style["input-decoration"]}>
          <input
            type="text"
            required={true}
            value={student_data.first_name}
            id="first_name"
            name="first_name"
            onChange={(e) =>
              setStudentData({ ...student_data, first_name: e.target.value })
            }
          ></input>
          <span>First name</span>
        </div>

        <div className={style["input-decoration"]}>
          <input
            type="text"
            required={true}
            value={student_data.last_name}
            id="last_name"
            name="last_name"
            onChange={(e) =>
              setStudentData({ ...student_data, last_name: e.target.value })
            }
          ></input>
          <span>Last name</span>
        </div>

        <div className={style["input-decoration"]}>
          <input
            type="email"
            required={true}
            value={student_data.email_id}
            id="email_id"
            name="email_id"
            onChange={(e) =>
              setStudentData({ ...student_data, email_id: e.target.value })
            }
          ></input>
          <span>Email Id</span>
        </div>

        <div className={style["input-decoration"]}>
          <input
            type="password"
            required={true}
            value={student_data.password}
            id="password"
            name="password"
            onChange={(e) =>
              setStudentData({ ...student_data, password: e.target.value })
            }
          ></input>
          <span>Password</span>
        </div>

        <select
          className={style["dropdown"]}
          onChange={(e) => {
            setStudentData({
              ...student_data,
              program_enrolled: e.target.value,
            });
          }}
        >
          <option value="" selected disabled hidden>
            Select program
          </option>
          {PROGRAM_LIST.map((p) => {
            return <option value={p}>{p}</option>;
          })}
        </select>

        <button
          className={style["create-student"]}
          onClick={() => {
            createNewStudent();
          }}
        >
          Create new student
        </button>
      </div>
    </div>
  );
}
