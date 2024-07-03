"use client";

import { useEffect, useState } from "react";
import * as admin_client from "../../../../(clients)/admin/student_client";
import { useRouter, useParams } from "next/navigation";

export default function EditStudent() {
  const [student_data, setStudentData] = useState({});
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    var email_id = decodeURIComponent(params.email_id);
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
        disabled={true}
        value={student_data.email_id}
        id="email_id"
        name="email_id"
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
          updateStudent();
        }}
      >
        Save changes
      </button>
    </div>
  );
}
