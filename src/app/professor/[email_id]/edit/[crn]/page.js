"use client";

import { useEffect, useState } from "react";
import * as professor_client from "@/app/(clients)/professor/offered_course_client";
import { useRouter, useParams } from "next/navigation";

import style from "./edit_offered_course.module.css";
import toast, { Toaster } from "react-hot-toast";

export default function EditOfferedCourse() {
  const day_list = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
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
      if (response == null || response == undefined) {
        toast.success("Sucessfully saved!");
        router.back();
      } else {
        toast.error(response["response"]);
      }
    });
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
        <h1>Edit offered course</h1>
      </div>
      <div className={style["content"]}>
        <div className={style["input-decoration"]}>
          <input
            type="number"
            id="course_id"
            name="course_id"
            disabled={true}
            value={offered_course.course_id}
          ></input>
          <span>Course Id</span>
        </div>
        <div className={style["input-decoration"]}>
          <input
            type="number"
            id="crn"
            name="crn"
            require={true}
            disabled={true}
            value={offered_course.crn}
          ></input>
          <span>CRN</span>
        </div>
        <h3>Date-Time</h3>
        <hr></hr>
        <div style={{ marginBottom: "10px" }}>
          <table>
            <thead>
              <tr>
                <th>Select a day</th>
                <th>Select start time</th>
                <th>Select end time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <select
                    className={style["day-picker"]}
                    onChange={(e) => setDay(e.target.value)}
                  >
                    {day_list.map((m) => {
                      return <option>{m}</option>;
                    })}
                  </select>
                </td>
                <td>
                  <input
                    className={style["time-picker"]}
                    type="time"
                    id="timing"
                    name="timing"
                    onChange={(e) => setStartTime(e.target.value)}
                  ></input>
                </td>
                <td>
                  <input
                    className={style["time-picker"]}
                    type="time"
                    id="timing"
                    name="timing"
                    onChange={(e) => setEndTime(e.target.value)}
                  ></input>
                </td>
                <td>
                  <button
                    onClick={() => {
                      var existing_day_time = offered_course.day_time;
                      var filtered_data = existing_day_time.filter(
                        (f) => f.day == selected_day
                      );

                      if (
                        selected_start_time == null ||
                        selected_start_time == undefined ||
                        selected_start_time == ""
                      ) {
                        toast.error("Start time cannot be empty");
                        return;
                      }

                      if (
                        selected_end_time == null ||
                        selected_end_time == undefined ||
                        selected_end_time == ""
                      ) {
                        toast.error("End time cannot be empty");
                        return;
                      }

                      if (filtered_data.length != 0) {
                        toast.error("Selected day already exists");
                        return;
                      }
                      existing_day_time.push({
                        day: selected_day,
                        start_time: selected_start_time,
                        end_time: selected_end_time,
                      });
                      setOfferedCourse({
                        ...offered_course,
                        day_time: existing_day_time,
                      });
                    }}
                  >
                    Add
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h3>Day-time list</h3>
          <hr></hr>
          <table>
            <thead>
              <tr>
                <th>Day</th>
                <th>Start time</th>
                <th>End time</th>
              </tr>
            </thead>
            <tbody>
              {offered_course.day_time.map((m) => {
                return (
                  <tr>
                    <td>{m.day}</td>
                    <td>{m.start_time}</td>
                    <td>{m.end_time}</td>
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
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p>{}</p>
        </div>
        <br></br>
        <button
          disabled={offered_course.day_time.length == 0 ? true : false}
          onClick={() => saveChanges()}
        >
          Save
        </button>
      </div>
    </div>
  );
}
