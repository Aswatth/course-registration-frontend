"use client";
import { useEffect, useState } from "react";
import * as utils from "@/app/(utils)/auth";
import * as admin_client from "@/app/(clients)/admin/professor_client";
import { useRouter, useParams } from "next/navigation";
import style from "./professors.module.css";
import toast from "react-hot-toast";

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
    toast((t) => (
      <span>
        Delete <b>{professor_email_id}</b> profile?
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <button
            style={{ background: "hsl(var(--green-accent800))" }}
            onClick={() => {
              admin_client
                .DeleteProfessor(professor_email_id)
                .then((response) => {
                  if (response == null || response == undefined) {
                    setProfessorList(
                      professor_list.filter(
                        (f) => f.email_id != professor_email_id
                      )
                    );
                  } else {
                    toast.error(response["response"]);
                  }
                });
              toast.dismiss(t.id);
            }}
          >
            Yes
          </button>
          <button
            style={{ background: "hsl(var(--red-accent600))" }}
            onClick={() => toast.dismiss(t.id)}
          >
            No
          </button>
        </div>
      </span>
    ));
  };

  const no_content = () => {
    return <div>No content</div>;
  };

  const professor_content = () => {
    return (
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
    );
  };

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
        <h1>Professors</h1>
      </div>
      <div>
        {professor_list.length == 0 ? no_content() : professor_content()}
      </div>
    </div>
  );
}
