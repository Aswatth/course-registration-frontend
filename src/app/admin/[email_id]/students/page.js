"use client";
import { useEffect, useState } from "react";
import * as utils from "@/app/(utils)/auth";
import * as admin_client from "@/app/(clients)/admin/student_client";
import { useParams, useRouter } from "next/navigation";

import style from "./students.module.css";

export default function StudentPage() {
  const router = useRouter();
  const params = useParams();
  const [student_list, setStudentList] = useState([]);

  useEffect(() => {
    const email_id = decodeURIComponent(params.email_id);
    utils.checkAuth("ADMIN", email_id).then(() => {
      admin_client.GetAllStudents().then((value) => {
        if (value != null) {
          setStudentList(value);
        }
      });
    });
  }, []);

  const delete_student = async (student_email_id) => {
    admin_client.DeleteStudent(student_email_id).then(() => {
      setStudentList(
        student_list.filter((f) => f.email_id != student_email_id)
      );
    });
  };

  const no_content = () => {
    return <div>No content</div>;
  };

  const student_content = () => {
    return (
      <div className={style["content"]}>
        <div className={style["add"]}>
          <button
            className={style["add-button"]}
            onClick={() => router.push("students/add")}
          >
            Add student
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>First name</th>
              <th>Last name</th>
              <th>Email Id</th>
              <th>Program enrolled</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {student_list.map((m) => {
              return (
                <tr>
                  <td>{m.first_name}</td>
                  <td>{m.last_name}</td>
                  <td>{m.email_id}</td>
                  <td>{m.program_enrolled}</td>
                  <td>
                    <div className={style["student-actions"]}>
                      <button
                        className={style["edit-student"]}
                        onClick={() =>
                          router.push("students/edit/" + m.email_id)
                        }
                      >
                        Edit
                      </button>
                      <button
                        className={style["delete-student"]}
                        onClick={() => delete_student(m.email_id)}
                      >
                        DELETE
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className={style["page"]}>
      <div className={style["header"]}>
        <h1>Students</h1>
      </div>
      {student_list.length == 0 ? no_content() : student_content()}
    </div>
  );
}
