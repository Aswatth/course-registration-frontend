"use client";

import { useEffect, useState } from "react";
import * as student_client from "@/app/(clients)/student/register_course_client";

export default function BrowseOfferedCourses() {
  const [offered_courses, setOfferedCourses] = useState([]);

  useEffect(() => {
    student_client.GetAllOfferedCourses().then((data) => {
      setOfferedCourses(data);
    });
  }, []);

  return (
    <div>
      {JSON.stringify(offered_courses)}
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
          </tr>
        </thead>
        <tbody>
          {offered_courses.map((m) => {
            return (
              <tr>
                <td>{m.course_id}</td>
                <td>{m.crn}</td>
                <td>
                  {m.day_time.map((dt) => {
                    return (
                      <div>
                        {dt.day}: {dt.start_time} - {dt.end_time}
                      </div>
                    );
                  })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
