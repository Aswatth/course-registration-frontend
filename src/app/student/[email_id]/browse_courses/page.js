"use client";

import { useEffect, useState } from "react";
import * as student_client from "@/app/(clients)/student/register_course_client";
import { useParams, useRouter } from "next/navigation";

import style from "./browse_courses.module.css";

export default function BrowseOfferedCourses() {
  const params = useParams();
  const router = useRouter();

  const [offered_courses, setOfferedCourses] = useState([]);
  const [registered_courses, setRegisteredCourses] = useState([]);

  useEffect(() => {
    student_client.GetAllOfferedCourses().then((data) => {
      setOfferedCourses(data);
    });
    student_client
      .GetRegisteredCourses(decodeURIComponent(params.email_id))
      .then((data) => {
        var crn_list = [];
        data.map((m) => {
          crn_list.push(m.offered_course.crn);
        });
        setRegisteredCourses(crn_list);
      });
  }, []);

  function saveRegisteredCourses() {
    var final_data = {
      student_email_id: decodeURIComponent(params.email_id),
      registered_course_crns: registered_courses,
    };
    student_client.RegisterCourses(final_data).then((response) => {
      if (response != undefined && response["response"] != undefined) {
        alert(response["response"]);
      } else {
        router.back();
      }
    });
  }

  function displayRegisteredCourses() {
    if (registered_courses.length != 0) {
      return (
        <div className={style["sub-content"]}>
          <table>
            <thead>
              <tr>
                <th>Course Id</th>
                <th>CRN</th>
                <th>Course name</th>
                <th>Description</th>
                <th>Department</th>
                <th>Credits</th>
                <th>Schedule</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {offered_courses.map((m) => {
                if (registered_courses.includes(m.crn)) {
                  return (
                    <tr>
                      <td>{m.course_id}</td>
                      <td>{m.crn}</td>
                      <td>{m.course_info.course_name}</td>
                      <td>{m.course_info.course_description}</td>
                      <td>{m.course_info.department}</td>
                      <td>{m.course_info.credits}</td>
                      <td>
                        {m.day_time.map((dt) => {
                          return (
                            <div>
                              {dt.day}: {dt.start_time} - {dt.end_time}
                            </div>
                          );
                        })}
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            setRegisteredCourses(
                              registered_courses.filter((f) => f != m.crn)
                            );
                          }}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                } else {
                  return <div></div>;
                }
              })}
            </tbody>
          </table>
          <button
            onClick={() => {
              saveRegisteredCourses();
            }}
          >
            Save
          </button>
        </div>
      );
    } else {
      return <div></div>;
    }
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
        <h1>Browse courses</h1>
      </div>
      <div className={style["content"]}>
        <div className={style["sub-content"]}>
          <div className={style["sub-header"]}>
            <h3>Offered courses</h3>
          </div>
          <table>
            <thead>
              <tr>
                <th>Course Id</th>
                <th>CRN</th>
                <th>Course name</th>
                <th>Description</th>
                <th>Department</th>
                <th>Credits</th>
                <th>Schedule</th>
                <th>Register</th>
              </tr>
            </thead>
            <tbody>
              {offered_courses.map((m) => {
                return (
                  <tr>
                    <td>{m.course_id}</td>
                    <td>{m.crn}</td>
                    <td>{m.course_info.course_name}</td>
                    <td>{m.course_info.course_description}</td>
                    <td>{m.course_info.department}</td>
                    <td>{m.course_info.credits}</td>
                    <td>
                      {m.day_time.map((dt) => {
                        return (
                          <div>
                            {dt.day}: {dt.start_time} - {dt.end_time}
                          </div>
                        );
                      })}
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          var filter = registered_courses.filter(
                            (f) => f == m.crn
                          );
                          if (filter.length == 0) {
                            setRegisteredCourses([
                              ...registered_courses,
                              m.crn,
                            ]);
                          } else {
                            alert(m.crn + " already registered");
                          }
                        }}
                      >
                        Register
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div style={{ border: "1px solid black" }}></div>
        <div className={style["sub-content"]}>
          <div className={style["sub-header"]}>
            <h3>Registered courses</h3>
          </div>
          {displayRegisteredCourses()}
        </div>
      </div>
    </div>
  );
}
