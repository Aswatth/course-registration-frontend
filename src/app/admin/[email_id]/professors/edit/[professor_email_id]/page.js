"use client";

import { useEffect, useState } from "react";
import * as admin_client from "@/app/(clients)/admin/professor_client";
import { useRouter, useParams } from "next/navigation";

import style from "./edit_professor.module.css";

export default function EditProfessor() {
  const [professor_data, setProfessorData] = useState({});
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    var email_id = decodeURIComponent(params.professor_email_id);
    admin_client.GetProfessor(email_id).then((value) => {
      setProfessorData(value);
    });
  }, []);

  function updateProfessor() {
    admin_client.UpdateProfessor(professor_data).then((status) => {
      if (status == 200) {
        router.back();
      } else {
        alert("Error occured while updating professor details");
      }
    });
  }

  return (
    <div className={style["page"]}>
      <div className={style["header"]}>
        <h1>Edit professor</h1>
      </div>
      <div className={style["content"]}>
        <div className={style["input-decoration"]}>
          <input
            type="text"
            required={true}
            value={professor_data.first_name}
            id="first_name"
            name="first_name"
            onChange={(e) =>
              setProfessorData({
                ...professor_data,
                first_name: e.target.value,
              })
            }
          ></input>
          <span>First name</span>
        </div>
        <div className={style["input-decoration"]}>
          <input
            type="text"
            required={true}
            value={professor_data.last_name}
            id="last_name"
            name="last_name"
            onChange={(e) =>
              setProfessorData({ ...professor_data, last_name: e.target.value })
            }
          ></input>
          <span>Last name</span>
        </div>

        <div className={style["input-decoration"]}>
          <input
            type="email"
            required={true}
            disabled={true}
            value={professor_data.email_id}
            id="email_id"
            name="email_id"
          ></input>
          <span>Email Id</span>
        </div>

        <div className={style["input-decoration"]}>
          <input
            type="text"
            required={true}
            value={professor_data.designation}
            id="designation"
            name="designation"
            onChange={(e) =>
              setProfessorData({
                ...professor_data,
                designation: e.target.value,
              })
            }
          ></input>
          <span>Designation</span>
        </div>

        <div className={style["input-decoration"]}>
          <input
            type="text"
            required={true}
            value={professor_data.department}
            id="department"
            name="department"
            onChange={(e) =>
              setProfessorData({
                ...professor_data,
                department: e.target.value,
              })
            }
          ></input>
          <span>Department</span>
        </div>

        <button
          className={style["save-professor"]}
          onClick={() => {
            updateProfessor();
          }}
        >
          Save changes
        </button>
      </div>
    </div>
  );
}
