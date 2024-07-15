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
        <h1>Add professor</h1>
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
