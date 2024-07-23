"use client";

import { useEffect, useState } from "react";
import * as admin_client from "@/app/(clients)/admin/professor_client";
import { useRouter, useParams } from "next/navigation";

import style from "./edit_professor.module.css";
import toast from "react-hot-toast";

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
    if (professor_data.first_name == "") {
      toast.error("First name cannot be empty");
      return;
    } else if (professor_data.last_name == "") {
      toast.error("Last name cannot be empty");
      return;
    } else if (professor_data.designation == "") {
      toast.error("Designation cannot be empty");
      return;
    } else if (professor_data.department == "") {
      toast.error("Department cannot be empty");
      return;
    }

    admin_client.UpdateProfessor(professor_data).then((response) => {
      if (response == null || response == undefined) {
        toast.success("Successfully updated professor profile!");
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
