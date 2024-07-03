"use client";

import { useEffect, useState } from "react";
import * as utils from "@/app/(utils)/auth";
import { useParams } from "next/navigation";
import * as professor_client from "@/app/(clients)/professor/offered_course_client";

export default function ProfessorHomePage() {
  const params = useParams();

  const [offered_courses, setOfferedCourses] = useState([]);

  useEffect(() => {
    var email_id = decodeURIComponent(params.email_id);
    utils.checkAuth("PROFESSOR", email_id).then((value) => {
      if (value == true) {
        professor_client.GetOfferedCourse(email_id).then((data) => {
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
    <div>
      <button>Offer a new course</button>
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
                  <tr>
                    <td>
                      {m.days.map((d) => {
                        return <p>{d}</p>;
                      })}
                    </td>
                    <td>
                      {m.timings.map((t) => {
                        return <p>{t}</p>;
                      })}
                    </td>
                  </tr>
                </td>
                <td>
                  <button>Edit</button>
                  <button onClick={() => deleteOfferedCourse(m.crn)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </thead>
      </table>
    </div>
  );
}
