"use client";

import { useEffect, useState } from "react";
import * as utils from "@/app/(utils)/auth";
import { useParams, useRouter } from "next/navigation";
import * as professor_client from "@/app/(clients)/professor/offered_course_client";
import { logout } from "@/app/(clients)/login_client";
import style from "./professor.module.css";

export default function ProfessorHomePage() {
  const router = useRouter();
  const params = useParams();

  const [offered_courses, setOfferedCourses] = useState([]);

  useEffect(() => {
    var email_id = decodeURIComponent(params.email_id);
    utils.checkAuth("PROFESSOR", email_id).then((value) => {
      if (value == true) {
        professor_client.GetOfferedCourseByProfessor(email_id).then((data) => {
          setOfferedCourses(data);
        });
      }
    });
  }, []);

  function deleteOfferedCourse(crn) {
    professor_client.DeleteOfferedCourse(crn).then((status) => {
      if (status == 200) {
        setOfferedCourses(offered_courses.filter((f) => f.crn != crn));
      } else {
        alert("Error occured while deleting offered course");
      }
    });
  }

  return (
    <div className={style["page"]}>
      <div className={style["header"]}>
        <h1>Welcome Professor</h1>
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
      </div>
    </div>
  );
}
