"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as student_client from "@/app/(clients)/student/register_course_client";
import { logout } from "@/app/(clients)/login_client";

import style from "./student.module.css";

export default function StudentHomePage() {
  const router = useRouter();
  const params = useParams();

  const [registered_courses, setRegisteredCourses] = useState([]);
  const [register_crns, setRegisteredCRNs] = useState([]);

  useEffect(() => {
    student_client
      .GetRegisteredCourses(decodeURIComponent(params.email_id))
      .then((data) => {
        setRegisteredCourses(data);
        var crn_list = [];
        data.map((m) => {
          crn_list.push(m.offered_course.crn);
        });
        setRegisteredCRNs(crn_list);
      });
  }, []);

  function withdrawCourse(crn) {
    var email_id = decodeURIComponent(params.email_id);
    var updated_crn_list = register_crns.filter((f) => f != crn);
    student_client
      .UpdateRegisteredCourses(email_id, {
        registered_course_crns: updated_crn_list,
      })
      .then((response) => {
        if (response != undefined && response["response"] != undefined) {
          alert(response["response"]);
        } else {
          var update_data = registered_courses.filter(
            (f) => f.offered_course.crn != crn
          );
          setRegisteredCourses(update_data);
        }
      });
  }

  function displayRegisteredCourses() {
    if (registered_courses.length == 0) {
      return <div>No registered courses</div>;
    } else {
      return (
        <div style={{ display: "flex" }}>
          <table style={{ flex: 1 }}>
            <thead>
              <tr>
                <th>Course Id</th>
                <th>CRN</th>
                <th>Course name</th>
                <th>Course description</th>
                <th>Credits</th>
                <th>Department</th>
                <th>Offered By</th>
                <th>Day-Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {registered_courses.map((m) => {
                return (
                  <tr>
                    <td>{m.course_id}</td>
                    <td>{m.offered_course.crn}</td>
                    <td>{m.course_name}</td>
                    <td>{m.course_description}</td>
                    <td>{m.credits}</td>
                    <td>{m.department}</td>
                    <td>{m.offered_course.offered_by}</td>
                    <td>
                      {m.offered_course.day_time.map((dt) => {
                        return (
                          <p>
                            {dt.day}: {dt.start_time} - {dt.end_time}
                          </p>
                        );
                      })}
                    </td>
                    <td>
                      <button
                        className={style["withraw-course-button"]}
                        onClick={() => withdrawCourse(m.offered_course.crn)}
                      >
                        Withdraw
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }
  }

  return (
    <div className={style["page"]}>
      <div className={style["header"]}>
        <h1>Welcome Student</h1>
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
        <div className={style["browse-courses"]}>
          <button
            className={style["browse-courses-button"]}
            onClick={() => {
              router.push(
                decodeURIComponent(params.email_id) + "/browse_courses"
              );
            }}
          >
            Browse courses
          </button>
        </div>
        {/* <hr></hr> */}
        {displayRegisteredCourses()}
      </div>
    </div>
  );
}
