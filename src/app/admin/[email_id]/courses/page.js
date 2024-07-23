"use client";
import { useEffect, useState } from "react";
import * as utils from "@/app/(utils)/auth";
import * as admin_client from "@/app/(clients)/admin/course_client";
import { useParams, useRouter } from "next/navigation";

import style from "./courses_page.module.css";
import toast from "react-hot-toast";

export default function CoursePage() {
  const router = useRouter();
  const params = useParams();
  const [course_list, setCourseList] = useState([]);
  useEffect(() => {
    const email_id = decodeURIComponent(params.email_id);
    utils.checkAuth("ADMIN", email_id).then((value) => {
      if (value == true) {
        admin_client.GetAllCourses().then((value) => {
          setCourseList(value);
        });
      }
    });
  }, []);

  function deleteCourse(course_id) {
    // toast((t) => (
    //   <span>
    //     Custom and <b>bold</b>
    //     <button onClick={() => toast.dismiss(t.id)}>Dismiss</button>
    //   </span>
    // ));
    toast((t) => (
      <span>
        Delete Course with Id: <b>{course_id}</b> ?<br></br>
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <button
            style={{ background: "hsl(var(--green-accent800))" }}
            onClick={() => {
              admin_client.DeleteCourse(course_id).then((response) => {
                if (response == null || response == undefined) {
                  setCourseList(
                    course_list.filter((f) => f.course_id != course_id)
                  );
                  toast.dismiss(t.id);
                } else {
                  toast.error(response["response"]);
                }
              });
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
        <h1>Courses</h1>
      </div>
      <div className={style["content"]}>
        <div className={style["add"]}>
          <button
            className={style["add-button"]}
            onClick={() => router.push("courses/add")}
          >
            Add course
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th className={style["table-header"]}>Course Id</th>
              <th className={style["table-header"]}>Course name</th>
              <th className={style["table-header"]}>Course description</th>
              <th className={style["table-header"]}>Credits</th>
              <th className={style["table-header"]}>Department</th>
              <th className={style["table-header"]}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {course_list.map((m) => {
              return (
                <tr key={m.course_id}>
                  <td>{m.course_id}</td>
                  <td>{m.course_name}</td>
                  <td>{m.course_description}</td>
                  <td>{m.credits}</td>
                  <td>{m.department}</td>
                  <td>
                    <div className={style["course-actions"]}>
                      <button
                        className={style["edit-course"]}
                        onClick={() =>
                          router.push("courses/edit/" + m.course_id)
                        }
                      >
                        Edit
                      </button>
                      <button
                        className={style["delete-course"]}
                        onClick={() => deleteCourse(m.course_id)}
                      >
                        Delete
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
}
