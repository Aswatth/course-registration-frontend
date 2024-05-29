import style from "./my_plan.module.css";

export default function MyPlan() {
  const my_plans_list = [
    {
      plan_name: "First plan",
      courses: [
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
          course_id: "CS5010",
          crn: "1235",
          course_name: "Programming Design Paradigm",
          credits: "4",
          course_description: "A introduction to design patterns",
          department: "Khoury",
        },
      ],
    },
    {
      plan_name: "Second plan",
      courses: [
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
      ],
    },
    {
      plan_name: "Third plan",
      courses: [
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
      ],
    },
  ];

  function getPlannedCourses(mc) {
    return (
      <tr>
        <td>{mc.course_id}</td>
        <td>{mc.crn}</td>
        <td>{mc.course_name}</td>
        <td>{mc.credits}</td>
      </tr>
    );
  }

  return (
    <div className={style.my_plan}>
      <div className={style.header}>
        <h1>My plan</h1>
        <div className={style.header_actions}>
          <button>Browser courses</button>
          <button className={style.header_active_action}>My plan</button>
          <div className={style.profile}>AA</div>
        </div>
      </div>
      <div className={style.content}>
        {my_plans_list.map((m) => {
          return (
            <div className={style.plan}>
              <div className={style.plan_header}>
                <h3>{m.plan_name}</h3>
                <div className={style.plan_actions}>
                  <button>Edit</button>
                  <button>Delete</button>
                </div>
              </div>
              <hr />
              <table>
                <tr>
                  <th>Course ID</th>
                  <th>CRN</th>
                  <th>Course Name</th>
                  <th>Credits</th>
                </tr>
                {m.courses.map((mc) => {
                  return (
                    <tr>
                      <td>{mc.course_id}</td>
                      <td>{mc.crn}</td>
                      <td>{mc.course_name}</td>
                      <td>{mc.credits}</td>
                    </tr>
                  );
                })}
              </table>
            </div>
          );
        })}
      </div>
    </div>
  );
}
