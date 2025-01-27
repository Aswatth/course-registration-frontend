"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { GetProfessorProfile } from "@/app/(clients)/professor/professor_client";
import * as professor_client from "@/app/(clients)/professor/offered_course_client";
import { logout } from "@/app/(clients)/login_client";
import style from "./professor.module.css";
import toast from "react-hot-toast";
import { checkAuth } from "@/app/(utils)/auth";

export default function ProfessorHomePage() {
  const [professor_profile, setProfessorProfile] = useState({});
  const router = useRouter();
  const params = useParams();

  const [offered_courses, setOfferedCourses] = useState([]);

  useEffect(() => {
    var email_id = decodeURIComponent(params.email_id);
    checkAuth("PROFESSOR", email_id).then((value) => {
      if (value == true) {
        GetProfessorProfile(email_id).then((value) => {
          setProfessorProfile(value);
        });

        professor_client.GetOfferedCourseByProfessor(email_id).then((data) => {
          setOfferedCourses(data);
        });
      }
    });
  }, []);

  function displayOfferedCourses() {
    if (offered_courses == null || offered_courses.length == 0) {
      return <div>No offered courses</div>;
    } else {
      return (
        <table>
          <thead>
            <tr>
              <th>CRN</th>
              <th>Course Id</th>
              <th>Day-Timing</th>
              <th>Actions</th>
            </tr>
            {offered_courses.map((m) => {
              return (
                <tr>
                  <td>{m.crn}</td>
                  <td>{m.course_id}</td>
                  <td>
                    {m.day_time.map((dt) => {
                      return (
                        <span>
                          {dt.day}: {dt.start_time} - {dt.end_time}
                          <br></br>
                        </span>
                      );
                    })}
                  </td>
                  <td>
                    <div className={style["actions"]}>
                      <button
                        className={style["edit-action"]}
                        onClick={() =>
                          router.push(
                            decodeURIComponent(params.email_id) +
                              "/edit/" +
                              m.crn
                          )
                        }
                      >
                        Edit
                      </button>
                      <button
                        className={style["delete-action"]}
                        onClick={() => deleteOfferedCourse(m.crn)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </thead>
        </table>
      );
    }
  }

  function deleteOfferedCourse(crn) {
    toast((t) => (
      <span>
        Delete offered course <b>CRN: {crn}</b>?
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <button
            style={{ background: "hsl(var(--green-accent800))" }}
            onClick={() => {
              professor_client.DeleteOfferedCourse(crn).then((response) => {
                if (response == null || response == undefined) {
                  setOfferedCourses(
                    offered_courses.filter((f) => f.crn != crn)
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
  }

  return (
    <div className={style["page"]}>
      <div className={style["header"]}>
        <h1>
          Welcome {professor_profile.last_name}, {professor_profile.first_name}
        </h1>
        <button
          className={style["header-button"]}
          onClick={() => {
            router.push("/update_password");
          }}
        >
          Change password
        </button>
        <button
          className={style["header-button"]}
          onClick={() => {
            logout().then(() => {
              router.back("login");
            });
          }}
        >
          Logout
        </button>
      </div>
      <div className={style["content"]}>
        <div className={style["add"]}>
          <button
            className={style["add-button"]}
            onClick={() =>
              router.push(decodeURIComponent(params.email_id) + "/add")
            }
          >
            Offer a new course
          </button>
        </div>
        {displayOfferedCourses()}
      </div>
    </div>
  );
}
