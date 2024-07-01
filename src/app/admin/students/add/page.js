"use client";
import { useRouter } from "next/navigation";
import * as admin_client from "../../../(clients)/admin/student_client";

import { useState } from "react";

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
    <div>
      <label htmlFor="first_name">First name:</label>
      <br></br>
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
      <br></br>

      <label htmlFor="last_name">Last name:</label>
      <br></br>
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
      <br></br>

      <label htmlFor="email_id">Email Id:</label>
      <br></br>
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
      <br></br>

      <label htmlFor="password">Password:</label>
      <br></br>
      <input
        type="password"
        required={true}
        value={student_data.password}
        id="password"
        name="password"
      ></input>
      <br></br>

      <label htmlFor="program_enrolled">Program enrolled:</label>
      <br></br>
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
      <br></br>

      <button
        onClick={() => {
          createNewStudent();
        }}
      >
        Create new student
      </button>
    </div>
  );
}
