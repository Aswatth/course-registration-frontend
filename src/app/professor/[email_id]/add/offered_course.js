"use client";

import { useState } from "react";
import * as professor_client from "@/app/(clients)/professor/offered_course_client";
import { useParams } from "next/navigation";

import style from "./offer_course.module.css";
import toast, { Toaster } from "react-hot-toast";

export default function OfferCourse({ selected_course }) {
  const day_list = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const [crn, setCRN] = useState();

  const [day_time_list, setDayTimeList] = useState([]);

  const [selected_day, setDay] = useState("Monday");
  const [selected_start_time, setStartTime] = useState();
  const [selected_end_time, setEndTime] = useState();

  const params = useParams();

  function offerCourse() {
    if (crn == null || crn == undefined || crn == 0) {
      toast.error("CRN cannot be empty or zero");
      return;
    }

    var email_id = decodeURIComponent(params.email_id);

    var offered_course = {
      crn: crn,
      course_id: selected_course.course_id,
      offered_by: email_id,
      day_time: day_time_list,
    };

    professor_client.OfferCourse(offered_course).then((response) => {
      if (response != undefined) {
        toast.error(response["response"]);
      } else {
        toast.success("Successfully offered course");
      }
    });
  }

  return (
    <div className={style["content"]}>
      <div className={style["input-decoration"]}>
        <input
          type="number"
          id="course_id"
          name="course_id"
          disabled={true}
          value={selected_course.course_id}
        ></input>
        <span>Course Id</span>
      </div>
      <div className={style["input-decoration"]}>
        <input
          type="number"
          id="crn"
          name="crn"
          require={true}
          onChange={(e) => {
            setCRN(parseInt(e.target.value));
          }}
        ></input>
        <span>CRN</span>
      </div>
      <br></br>
      <h3>Date-Time</h3>
      <hr></hr>
      <br></br>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "10px",
        }}
      >
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
                    var filtered_data = day_time_list.filter(
                      (f) => f.day == selected_day
                    );

                    if (filtered_data.length != 0) {
                      toast.error("Selected day already exists");
                      return;
                    }

                    var data = [
                      ...day_time_list,
                      {
                        day: selected_day,
                        start_time: selected_start_time,
                        end_time: selected_end_time,
                      },
                    ];
                    setDayTimeList(data);
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {day_time_list.length == 0 ? (
            <span>No data</span>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Start time</th>
                  <th>End time</th>
                </tr>
              </thead>
              <tbody>
                {day_time_list.map((m) => {
                  return (
                    <tr>
                      <td>{m.day}</td>
                      <td>{m.start_time}</td>
                      <td>{m.end_time}</td>
                      <button
                        onClick={() => {
                          setDayTimeList(
                            day_time_list.filter((f) => f.day != m.day)
                          );
                        }}
                      >
                        Remove
                      </button>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <br></br>
      <div style={{ display: "flex" }}>
        <button
          disabled={day_time_list.length == 0 ? true : false}
          style={{ flex: 1 }}
          onClick={() => offerCourse()}
        >
          Offer
        </button>
      </div>
    </div>
  );
}
