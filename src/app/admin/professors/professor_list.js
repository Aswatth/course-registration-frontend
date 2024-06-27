"use client";

export default function ProfessorList({ professor_list }) {
  return (
    <div>
      {professor_list.map((m) => {
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
