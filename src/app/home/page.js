import style from "./home.module.css";

export default function Home() {
  const courses = [
    {
      course_id: "CS5800",
      crn: "1234",
      course_name: "Algorithms",
      credits: "4",
      course_description: "A introduction to algorithms",
      department: "Khoury",
    },
    {
      course_id: "CS5010",
      crn: "1235",
      course_name: "Programming Design Paradigm",
      credits: "4",
      course_description: "A introduction to design patterns",
      department: "Khoury",
    },
    {
      course_id: "CS5800",
      crn: "1234",
      course_name: "Algorithms",
      credits: "4",
      course_description: "A introduction to algorithms",
      department: "Khoury",
    },
    {
      course_id: "CS5010",
      crn: "1235",
      course_name: "Programming Design Paradigm",
      credits: "4",
      course_description: "A introduction to design patterns",
      department: "Khoury",
    },
  ];

  return (
    <div className={style.course_page}>
      <div className={style.header}>
        <h1>Home</h1>
        <div className={style.header_actions}>
          <button className={style.header_active_action}>Home</button>
          <button>Browser courses</button>
          <button>Register courses</button>
          <button>My plan</button>
          <div className={style.profile}>AA</div>
        </div>
      </div>
      <div className={style.content}>
        {courses.map((m) => {
          return (
            <div className={style.content_item}>
              <h3>{m.course_id}</h3>
              <h4>{m.course_name}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
}
