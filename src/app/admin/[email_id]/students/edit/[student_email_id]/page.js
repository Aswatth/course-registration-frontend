"use client";

import { useEffect, useState } from "react";
import * as admin_client from "@/app/(clients)/admin/student_client";
import { useRouter, useParams } from "next/navigation";

import style from "./edit_student.module.css";

export default function EditStudent() {
  const [student_data, setStudentData] = useState({});
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    var email_id = decodeURIComponent(params.student_email_id);
    admin_client.GetStudent(email_id).then((value) => {
      setStudentData(value);
    });
  }, []);

  function updateStudent() {
    admin_client.UpdateStudent(student_data).then((status) => {
      if (status == 200) {
        router.back();
      } else {
        alert("Error occured while updating student details");
      }
    });
  }

  return (
    <div className={style["page"]}>
      <div className={style["header"]}>
        <h1>Edit student</h1>
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
            disabled={true}
            value={student_data.email_id}
            id="email_id"
            name="email_id"
          ></input>
          <span>Email Id</span>
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
          className={style["save-student"]}
          onClick={() => {
            updateStudent();
          }}
        >
          Save changes
        </button>
      </div>
    </div>
  );
}
