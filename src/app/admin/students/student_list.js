"use client";

export default function StudentList({ student_list }) {
  return (
    <div>
      {student_list.map((m) => {
        return (
          <ul>
            <li>{m.email_id}</li>
            <li>{m.first_name}</li>
            <li>{m.last_name}</li>
          </ul>
        );
      })}
    </div>
  );
}
