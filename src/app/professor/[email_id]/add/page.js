"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import * as professor_client from "@/app/(clients)/professor/offered_course_client";
import OfferCourse from "./offered_course";

import style from "./available_courses.module.css";
import { checkAuth } from "@/app/(utils)/auth";

export default function AddOfferedCourse() {
  const router = useRouter();
  const params = useParams();

  const [course_list, setCourseList] = useState([]);
  const [selected_course, setSelectedCourse] = useState(null);

  useEffect(() => {
    var email_id = decodeURIComponent(params.email_id);
    checkAuth("PROFESSOR", email_id).then((value) => {
      if (value == true) {
        professor_client.GetAvailableCourses().then((data) => {
          setCourseList(data);
        });
      }
    });
  }, []);

  const no_content = (message) => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h4>{message}</h4>
      </div>
    );
  };

  const course_content = () => {
    return (
      <table>
        <tr>
          <th>Course Id</th>
          <th>Course name</th>
          <th>Course description</th>
          <th>Credits</th>
          <th>Department</th>
          <th>Actions</th>
        </tr>
        {course_list.map((m) => {
          return (
            <tr>
              <td>{m.course_id}</td>
              <td>{m.course_name}</td>
              <td>{m.course_description}</td>
              <td>{m.credits}</td>
              <td>{m.department}</td>
              <td>
                <button
                  onClick={() => {
                    setSelectedCourse(m);
                  }}
                >
                  Offer
                </button>
              </td>
            </tr>
          );
        })}
      </table>
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
        <h1>Add offered course</h1>
      </div>
      <div className={style["content"]}>
        <div className={style["sub-content"]}>
          <div className={style["sub-header"]}>
            <h3>Available Courses</h3>
          </div>
          <div className={style["sub-content"]}>
            {course_list == null
              ? no_content("No courses available to offer")
              : course_content()}
          </div>
        </div>
        <div style={{ borderRight: "10px solid black" }}></div>
        <div className={style["sub-content"]}>
          <div className={style["sub-header"]}>
            <h3>Offer Course</h3>
          </div>
          <div></div>
          {selected_course == null ? (
            no_content("No course selected to offer")
          ) : (
            <OfferCourse selected_course={selected_course}></OfferCourse>
          )}
        </div>
      </div>
    </div>
  );
}
