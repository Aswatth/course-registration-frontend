"use client";
import { useEffect } from "react";
import * as utils from "@/app/(utils)/auth";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { logout } from "@/app/(clients)/login_client";

import style from "./admin_home_page.module.css";

export default function AdminHome() {
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const email_id = decodeURIComponent(params.email_id);
    utils.checkAuth("ADMIN", email_id).then(() => {});
  });

  return (
    <div className={style["page"]}>
      <div className={style["header"]}>
        <h1>Welcome Admin</h1>
        <button className={style["header-button"]} onClick={() => {}}>
          Change password
        </button>
        <button
          className={style["header-button"]}
          onClick={() => {
            logout().then(() => {
              router.back("login");
            });
          }}
        >
          Logout
        </button>
      </div>
      <div className={style["content"]}>
        <div
          className={style["option"]}
          onClick={() =>
            router.push(
              "/admin/" + decodeURIComponent(params.email_id) + "/courses"
            )
          }
        >
          <h1>Courses</h1>
        </div>
        <div
          className={style["option"]}
          onClick={() =>
            router.push(
              "/admin/" + decodeURIComponent(params.email_id) + "/professors"
            )
          }
        >
          <h1>Professors</h1>
        </div>
        <div
          className={style["option"]}
          onClick={() =>
            router.push(
              "/admin/" + decodeURIComponent(params.email_id) + "/students"
            )
          }
        >
          <h1>Students</h1>
        </div>
      </div>
    </div>
  );
}
