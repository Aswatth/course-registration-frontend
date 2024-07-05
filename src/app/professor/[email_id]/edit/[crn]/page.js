"use client";

import { useEffect, useState } from "react";
import * as professor_client from "@/app/(clients)/professor/offered_course_client";
import { useRouter, useParams } from "next/navigation";

export default function EditOfferedCourse() {
  const [offered_course, setOfferedCourse] = useState({ day_time: [] });

  const [selected_day, setDay] = useState("Monday");
  const [selected_start_time, setStartTime] = useState();
  const [selected_end_time, setEndTime] = useState();

  const router = useRouter();
  const parmas = useParams();

  useEffect(() => {
    var CRN = decodeURIComponent(parmas.crn);
    professor_client.GetOfferedCourseByCRN(CRN).then((data) => {
      setOfferedCourse(data);
    });
  }, []);

  function saveChanges() {
    professor_client.UpdateOfferedCourse(offered_course).then((response) => {
      if (response["response"] != undefined) {
        alert(response["response"]);
      } else {
        router.back();
      }
    });
  }

  return (
    <div>
      <div>
        <label htmlFor="course_id">Course Id</label>
        <br></br>
        <input
          type="number"
          id="course_id"
          name="course_id"
          disabled={true}
          value={offered_course.course_id}
        ></input>
        <br></br>
        <label htmlFor="crn">CRN</label>
        <br></br>
        <input
          type="number"
          id="crn"
          name="crn"
          require={true}
          disabled={true}
          value={offered_course.crn}
        ></input>
        <br></br>
        <h3>Date-Time</h3>
        <br></br>
        <div>
          <select onChange={(e) => setDay(e.target.value)}>
            <option>Monday</option>
            <option>Tuesday</option>
          </select>
          Start time:
          <input
            type="time"
            id="timing"
            name="timing"
            onChange={(e) => setStartTime(e.target.value)}
          ></input>
          End time:
          <input
            type="time"
            id="timing"
            name="timing"
            onChange={(e) => setEndTime(e.target.value)}
          ></input>
          <button
            onClick={() => {
              var existing_day_time = offered_course.day_time;
              var filtered_data = existing_day_time.filter(
                (f) => f.day == selected_day
              );
              if (filtered_data.length != 0) {
                alert("Selected day already exists");
              } else {
                existing_day_time.push({
                  day: selected_day,
                  start_time: selected_start_time,
                  end_time: selected_end_time,
                });
                setOfferedCourse({
                  ...offered_course,
                  day_time: existing_day_time,
                });
              }
            }}
          >
            Add
          </button>
          <p>Day-time list</p>
          <p>
            {offered_course.day_time.map((m) => {
              return (
                <div>
                  <span>
                    {m.day}: {m.start_time} - {m.end_time}
                  </span>
                  <button
                    onClick={() => {
                      var existing_day_time = offered_course.day_time;

                      existing_day_time = existing_day_time.filter(
                        (f) => f.day != m.day
                      );
                      console.log(existing_day_time);
                      setOfferedCourse({
                        ...offered_course,
                        day_time: existing_day_time,
                      });
                    }}
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </p>
        </div>
        <br></br>
        <button onClick={() => saveChanges()}>Save</button>
      </div>
    </div>
  );
}
