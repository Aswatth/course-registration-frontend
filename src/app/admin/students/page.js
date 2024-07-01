"use client";
import { useEffect, useState } from "react";
import * as utils from "../../(utils)/auth";
import * as admin_client from "@/app/(clients)/admin/student_client";
import { useRouter } from "next/navigation";

export default function StudentPage() {
  const router = useRouter();
  const [student_list, setStudentList] = useState([]);

  useEffect(() => {
    utils.checkAuth().then(() => {
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
      <div>
        <button onClick={() => {router.push("/admin/students/add")}}>Add new student</button>
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
                    <button
                      onClick={() =>
                        router.push("/admin/students/edit/" + m.email_id)
                      }
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button onClick={() => delete_student(m.email_id)}>
                      DELETE
                    </button>
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
    <div>
      student page
      {student_list.length == 0 ? no_content() : student_content()}
    </div>
  );
}
