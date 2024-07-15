"use client";
import { useEffect, useState } from "react";
import * as utils from "@/app/(utils)/auth";
import * as admin_client from "@/app/(clients)/admin/professor_client";
import { useRouter, useParams } from "next/navigation";
import style from "./professors.module.css";

export default function ProfessorsPage() {
  const router = useRouter();
  const params = useParams();
  const [professor_list, setProfessorList] = useState([]);
  useEffect(() => {
    const email_id = decodeURIComponent(params.email_id);
    utils.checkAuth("ADMIN", email_id).then(() => {
      admin_client.GetAllProfessors().then((value) => {
        if (value != null) {
          setProfessorList(value);
        }
      });
    });
  }, []);

  const delete_professor = (professor_email_id) => {
    admin_client.DeleteProfessor(professor_email_id).then(() => {
      setProfessorList(
        professor_list.filter((f) => f.email_id != professor_email_id)
      );
    });
  };

  const no_content = () => {
    return <div>No content</div>;
  };

  const professor_content = () => {
    return (
      <div className={style["page"]}>
        <div className={style["header"]}>
          <h1>Professors</h1>
        </div>
        <div className={style["content"]}>
          <div className={style["add"]}>
            <button
              className={style["add-button"]}
              onClick={() => router.push("professors/add")}
            >
              Add professor
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>First name</th>
                <th>Last name</th>
                <th>Email Id</th>
                <th>Designation</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {professor_list.map((m) => {
                return (
                  <tr>
                    <td>{m.first_name}</td>
                    <td>{m.last_name}</td>
                    <td>{m.email_id}</td>
                    <td>{m.designation}</td>
                    <td>{m.department}</td>
                    <td>
                      <div className={style["professor-actions"]}>
                        <button
                          className={style["edit-professor"]}
                          onClick={() =>
                            router.push("professors/edit/" + m.email_id)
                          }
                        >
                          Edit
                        </button>
                        <button
                          className={style["delete-professor"]}
                          onClick={() => delete_professor(m.email_id)}
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
      </div>
    );
  };

  return (
    <div>{professor_list.length == 0 ? no_content() : professor_content()}</div>
  );
}
