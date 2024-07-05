"use client";

import { useParams, useRouter } from "next/navigation";

export default function StudentHomePage() {
  const router = useRouter();
  const params = useParams();

  return (
    <div>
      Student home page <br></br>
      <button
        onClick={() => {
          router.push(decodeURIComponent(params.email_id) + "/browse_courses");
        }}
      >
        Browse courses
      </button>
      <hr></hr>
      Registered courses
    </div>
  );
}
