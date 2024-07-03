"use client";
import { useRouter } from "next/navigation";
import * as admin_client from "@/app/(clients)/admin/professor_client";

import { useState } from "react";

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
    <div>
      <label htmlFor="first_name">First name:</label>
      <br></br>
      <input
        type="text"
        required={true}
        value={professor_data.first_name}
        id="first_name"
        name="first_name"
        onChange={(e) =>
          setProfessorData({ ...professor_data, first_name: e.target.value })
        }
      ></input>
      <br></br>

      <label htmlFor="last_name">Last name:</label>
      <br></br>
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
      <br></br>

      <label htmlFor="email_id">Email Id:</label>
      <br></br>
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
      <br></br>

      <label htmlFor="password">Password:</label>
      <br></br>
      <input
        type="password"
        required={true}
        value={professor_data.password}
        id="password"
        name="password"
      ></input>
      <br></br>

      <label htmlFor="designation">Designation:</label>
      <br></br>
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
      <br></br>

      <label htmlFor="department">Department:</label>
      <br></br>
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
      <br></br>

      <button
        onClick={() => {
          createNewProfessor();
        }}
      >
        Create new professor
      </button>
    </div>
  );
}
