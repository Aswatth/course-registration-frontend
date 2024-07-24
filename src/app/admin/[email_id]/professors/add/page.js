"use client";
import { useRouter } from "next/navigation";
import * as admin_client from "@/app/(clients)/admin/professor_client";

import { useState } from "react";

import style from "./add_professor.module.css";
import toast from "react-hot-toast";

import { DEPARTMENT_LIST, DESIGNATION_LIST } from "@/app/(utils)/constants";

export default function AddProfessor() {
  const router = useRouter();
  const [professor_data, setProfessorData] = useState({});

  function createNewProfessor() {
    var professor_form_data = Object.keys(professor_data);

    if (
      !professor_form_data.includes("first_name") ||
      professor_data.first_name == ""
    ) {
      toast.error("First name cannot be empty");
      return;
    } else if (
      !professor_form_data.includes("last_name") ||
      professor_data.last_name == ""
    ) {
      toast.error("Last name cannot be empty");
      return;
    } else if (
      !professor_form_data.includes("email_id") ||
      professor_data.email_id == ""
    ) {
      toast.error("Email Id cannot be empty");
      return;
    } else if (
      !professor_form_data.includes("password") ||
      professor_data.password == ""
    ) {
      toast.error("Password cannot be empty");
      return;
    } else if (
      !professor_form_data.includes("designation") ||
      professor_data.designation == ""
    ) {
      toast.error("Designation cannot be empty");
      return;
    } else if (
      !professor_form_data.includes("department") ||
      professor_data.department == ""
    ) {
      toast.error("Department cannot be empty");
      return;
    }

    admin_client.CreateProfessor(professor_data).then((response) => {
      if (response == null || response == undefined) {
        toast.success("Successfully created a new professor profile");
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
            onChange={(e) =>
              setProfessorData({ ...professor_data, password: e.target.value })
            }
          ></input>
          <span>Password</span>
        </div>

        <select
          className={style["dropdown"]}
          onChange={(e) => {
            setProfessorData({
              ...professor_data,
              designation: e.target.value,
            });
          }}
        >
          <option value="" selected disabled hidden>
            Select designation
          </option>
          {DESIGNATION_LIST.map((d) => {
            return <option value={d}>{d}</option>;
          })}
        </select>

        <select
          className={style["dropdown"]}
          onChange={(e) => {
            setProfessorData({
              ...professor_data,
              department: e.target.value,
            });
          }}
        >
          <option value="" selected disabled hidden>
            Select department
          </option>
          {DEPARTMENT_LIST.map((d) => {
            return <option value={d}>{d}</option>;
          })}
        </select>

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
