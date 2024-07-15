"use client";
import { useRouter } from "next/navigation";
import * as admin_client from "@/app/(clients)/admin/professor_client";

import { useState } from "react";

import style from "./add_professor.module.css";

export default function AddProfessor() {
  const router = useRouter();
  const [professor_data, setProfessorData] = useState({});

  function createNewProfessor() {
    admin_client.CreateProfessor(professor_data).then((status) => {
      if (status == 200) {
        router.back();
      } else {
        alert("Error occured while creating new professor profile");
      }
    });
  }

  return (
    <div className={style["page"]}>
      <div className={style["header"]}>Add professor</div>
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
            value={professor_data.email_id}
            id="email_id"
            name="email_id"
            onChange={(e) =>
              setProfessorData({ ...professor_data, email_id: e.target.value })
            }
          ></input>
          <span>Email Id</span>
        </div>

        <div className={style["input-decoration"]}>
          <input
            type="password"
            required={true}
            value={professor_data.password}
            id="password"
            name="password"
          ></input>
          <span>Password</span>
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
          className={style["create-professor"]}
          onClick={() => {
            createNewProfessor();
          }}
        >
          Create new professor
        </button>
      </div>
    </div>
  );
}
