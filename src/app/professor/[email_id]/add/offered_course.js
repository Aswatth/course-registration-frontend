"use client";

import { useState } from "react";
import * as professor_client from "@/app/(clients)/professor/offered_course_client";
import { useParams } from "next/navigation";

export default function OfferCourse({ selected_course }) {
  const [crn, setCRN] = useState();

  const [day_time_list, setDayTimeList] = useState([]);

  const [selected_day, setDay] = useState("Monday");
  const [selected_start_time, setStartTime] = useState();
  const [selected_end_time, setEndTime] = useState();

  const params = useParams();

  function offerCourse() {
    var email_id = decodeURIComponent(params.email_id);

    var offered_course = {
      crn: crn,
      course_id: selected_course.course_id,
      offered_by: email_id,
      day_time: day_time_list,
    };

    professor_client.OfferCourse(offered_course).then((response) => {
      if (response != undefined) {
        alert(response["response"]);
      }
    });
  }

  return (
    <div>
      <label htmlFor="course_id">Course Id</label>
      <br></br>
      <input
        type="number"
        id="course_id"
        name="course_id"
        disabled={true}
        value={selected_course.course_id}
      ></input>
      <br></br>
      <label htmlFor="crn">CRN</label>
      <br></br>
      <input
        type="number"
        id="crn"
        name="crn"
        require={true}
        onChange={(e) => {
          setCRN(parseInt(e.target.value));
        }}
      ></input>{" "}
      <br></br>
      <h3>Date-Time</h3>
      <br></br>
      <div>
        <select onChange={(e) => setDay(e.target.value)}>
          <option>Monday</option>
          <option>Tuesday</option>
        </select>
        Start time:{" "}
        <input
          type="time"
          id="timing"
          name="timing"
          onChange={(e) => setStartTime(e.target.value)}
        ></input>
        End time:{" "}
        <input
          type="time"
          id="timing"
          name="timing"
          onChange={(e) => setEndTime(e.target.value)}
        ></input>
        <button
          onClick={() => {
            var filtered_data = day_time_list.filter(
              (f) => f.day == selected_day
            );
            console.log(day_time_list, filtered_data);
            if (filtered_data.length != 0) {
              alert("Selected day already exists");
            } else {
              var data = [
                ...day_time_list,
                {
                  day: selected_day,
                  start_time: selected_start_time,
                  end_time: selected_end_time,
                },
              ];
              setDayTimeList(data);
            }
          }}
        >
          Add
        </button>
        <p>Day-time list</p>
        <p>
          {day_time_list.map((m) => {
            return (
              <div>
                <span>
                  {m.day}: {m.start_time} - {m.end_time}
                </span>
                <button
                  onClick={() => {
                    setDayTimeList(day_time_list.filter((f) => f.day != m.day));
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
      <button onClick={() => offerCourse()}>Offer</button>
    </div>
  );
}
