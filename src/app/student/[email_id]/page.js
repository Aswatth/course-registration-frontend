"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as student_client from "@/app/(clients)/student/register_course_client";

export default function StudentHomePage() {
  const router = useRouter();
  const params = useParams();

  const [registered_courses, setRegisteredCourses] = useState([]);

  useEffect(() => {
    student_client
      .GetRegisteredCourses(decodeURIComponent(params.email_id))
      .then((data) => {
        setRegisteredCourses(data);
      });
  }, []);

  function displayRegisteredCourses() {
    if (registered_courses.length == 0) {
      return <div>No registered courses</div>;
    } else {
      return (
        <div>
          <table>
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
                          <span>
                            {dt.day}: {dt.start_time} - {dt.end_time}
                          </span>
                        );
                      })}
                    </td>
                    <td>
                      <button>Withdraw</button>
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
    <div>
      Student home page <br></br>
      <button
        onClick={() => {
          router.push(decodeURIComponent(params.email_id) + "/browse_courses");
        }}
      >
        Browse courses
      </button>
      <hr></hr>
      {displayRegisteredCourses()}
    </div>
  );
}
