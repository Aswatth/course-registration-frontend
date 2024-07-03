"use client";
import { useEffect, useState } from "react";
import * as utils from "@/app/(utils)/auth";
import * as admin_client from "@/app/(clients)/admin/course_client";
import { useParams, useRouter } from "next/navigation";

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
    <div>
      Course page <br></br>
      <button onClick={() => router.push("courses/add")}>Add new course</button>
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
                  onClick={() => router.push("courses/edit/" + m.course_id)}
                >
                  Edit
                </button>
                <button onClick={() => deleteCourse(m.course_id)}>
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
