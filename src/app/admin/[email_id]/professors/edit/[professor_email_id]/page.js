"use client";

import { useEffect, useState } from "react";
import * as admin_client from "@/app/(clients)/admin/professor_client";
import { useRouter, useParams } from "next/navigation";

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
        disabled={true}
        value={professor_data.email_id}
        id="email_id"
        name="email_id"
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
          setProfessorData({ ...professor_data, designation: e.target.value })
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
          setProfessorData({ ...professor_data, department: e.target.value })
        }
      ></input>
      <br></br>

      <button
        onClick={() => {
          updateProfessor();
        }}
      >
        Save changes
      </button>
    </div>
  );
}
