"use client";
import { useEffect, useState } from "react";
import * as utils from "@/app/(utils)/auth";
import * as admin_client from "@/app/(clients)/admin/course_client";
import { useParams, useRouter } from "next/navigation";

import style from "./courses_page.module.css";

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
    admin_client.DeleteCourse(course_id).then((status) => {
      if (status == 200) {
        setCourseList(course_list.filter((f) => f.course_id != course_id));
      } else {
        alert("Error occured while deleting course");
      }
    });
  }

  return (
    <div className={style["page"]}>
      <div className={style["header"]}>
        <button onClick={() => router.back()}>Back</button>
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
