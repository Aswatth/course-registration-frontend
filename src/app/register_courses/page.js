import style from "./register_course_page.module.css";

export default function CoursePage() {
  const courses = [
    {
      course_id: "CS5800",
      crn: "1234",
      course_name: "Algorithms",
      credits: "4",
      course_description: "A introduction to algorithms",
      department: "Khoury",
      timings: [
        {
          day: "Monday",
          time: "11:45 AM - 1:30 PM",
        },
        {
          day: "Thursday",
          time: "11:45 AM - 1:30 PM",
        },
      ],
    },
    {
      course_id: "CS5010",
      crn: "1235",
      course_name: "Programming Design Paradigm",
      credits: "4",
      course_description: "A introduction to design patterns",
      department: "Khoury",
      timings: [
        {
          day: "Monday",
          time: "11:45 AM - 1:30 PM",
        },
        {
          day: "Thursday",
          time: "11:45 AM - 1:30 PM",
        },
      ],
    },
  ];

  return (
    <div className={style.course_page}>
      <div className={style.header}>
        <h1>Register courses</h1>
        <div className={style.header_actions}>
          <button className={style.header_active_action}>
            Register courses
          </button>
          <button>Browser courses</button>
          <button>My plan</button>
          <div className={style.profile}>AA</div>
        </div>
      </div>
      <div className={style.content}>
        <table>
          <tr>
            <th>Course ID</th>
            <th>CRN</th>
            <th>Course name</th>
            <th>Credits</th>
            <th>Date & Time</th>
            <th>Action</th>
          </tr>
          {courses.map((m) => {
            return (
              <tr>
                <td>{m.course_id}</td>
                <td>{m.crn}</td>
                <td>{m.course_name}</td>
                <td>{m.credits}</td>
                <td>
                  {m.timings.map((mt) => {
                    return (
                      <tr>
                        <td>{mt.day}</td>
                        <td>{mt.time}</td>
                      </tr>
                    );
                  })}
                </td>
                <td>
                  <button>Register</button>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}
