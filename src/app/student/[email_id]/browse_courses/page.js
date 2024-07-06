"use client";

import { useEffect, useState } from "react";
import * as student_client from "@/app/(clients)/student/register_course_client";
import { useParams, useRouter } from "next/navigation";

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
        <div>
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
    <div>
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
                      var filter = registered_courses.filter((f) => f == m.crn);
                      if (filter.length == 0) {
                        setRegisteredCourses([...registered_courses, m.crn]);
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
      <hr></hr>
      {displayRegisteredCourses()}
    </div>
  );
}
