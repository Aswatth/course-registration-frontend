"use client";
import { useEffect, useState } from "react";
import * as utils from "@/app/(utils)/auth";
import { useParams } from "next/navigation";
import * as professor_client from "@/app/(clients)/professor/offered_course_client";
import OfferCourse from "./offered_course";

export default function AddOfferedCourse() {
  const params = useParams();

  const [course_list, setCourseList] = useState([]);
  const [selected_course, setSelectedCourse] = useState(null);

  useEffect(() => {
    var email_id = decodeURIComponent(params.email_id);
    utils.checkAuth("PROFESSOR", email_id).then((value) => {
      if (value == true) {
        professor_client.GetAvailableCourses().then((data) => {
          setCourseList(data);
        });
      }
    });
  }, []);

  const no_content = (message) => {
    return <div>{message}</div>;
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
    <div>
      Add offered course
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ flex: "1" }}>
          Available Courses
          {course_list == null
            ? no_content("No courses available to offer")
            : course_content()}
        </div>
        <div style={{ flex: "1" }}>
          Offer course
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
