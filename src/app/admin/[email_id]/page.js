"use client";
import { useEffect } from "react";
import * as utils from "@/app/(utils)/auth";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function AdminHome() {
  const params = useParams();
  useEffect(() => {
    const email_id = decodeURIComponent(params.email_id);
    utils.checkAuth("ADMIN", email_id).then(() => {});
  });

  return (
    <div>
      <Link
        href={"/admin/" + decodeURIComponent(params.email_id) + "/students"}
      >
        Students
      </Link>
      <br></br>
      <Link
        href={"/admin/" + decodeURIComponent(params.email_id) + "/professors"}
      >
        Professors
      </Link>
      <br></br>
      <Link href={"/admin/" + decodeURIComponent(params.email_id) + "/courses"}>
        Courses
      </Link>
      <br></br>
    </div>
  );
}
