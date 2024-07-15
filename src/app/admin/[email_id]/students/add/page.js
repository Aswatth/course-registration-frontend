"use client";
import { useRouter } from "next/navigation";
import * as admin_client from "@/app/(clients)/admin/student_client";

import { useState } from "react";

import style from "./add_student.module.css";

export default function AddStudent() {
  const router = useRouter();
  const [student_data, setStudentData] = useState({});

  function createNewStudent() {
    admin_client.CreateStudent(student_data).then((status) => {
      if (status == 200) {
        router.back();
      } else {
        alert("Error occured while creating new student profile");
      }
    });
  }

  return (
    <div className={style["page"]}>
      <div className={style["header"]}>
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
          ></input>
          <span>Password</span>
        </div>

        <div className={style["input-decoration"]}>
          <input
            type="text"
            required={true}
            value={student_data.program_enrolled}
            id="program_enrolled"
            name="program_enrolled"
            onChange={(e) =>
              setStudentData({
                ...student_data,
                program_enrolled: e.target.value,
              })
            }
          ></input>
          <span>Program enrolled</span>
        </div>

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
