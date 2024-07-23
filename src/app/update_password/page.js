"use client";
import { useRouter } from "next/navigation";
import style from "./update_password.module.css";
import { useState } from "react";
import toast from "react-hot-toast";

import { UpdatePassword } from "@/app/(clients)/update_password_client";

export default function ChangePassword() {
  const [new_password, setNewPassword] = useState("");
  const [confirm_new_password, setConfirmNewPassword] = useState("");

  const router = useRouter();

  function updatePassword() {
    if (new_password == "" && confirm_new_password == "") {
      toast.error("New password cannot be empty");
      return;
    }
    if (new_password != confirm_new_password) {
      toast.error("Password does not match!");
      return;
    } else {
      UpdatePassword(new_password).then((response) => {
        if (response == null || response == undefined) {
          toast.success("Successfully updated password");
          router.back();
        } else {
          toast.error(response["response"]);
        }
      });
    }
  }

  return (
    <div className={style["page"]}>
      <div className={style["header"]}>
        <button onClick={() => router.back()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-chevron-compact-left"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M9.224 1.553a.5.5 0 0 1 .223.67L6.56 8l2.888 5.776a.5.5 0 1 1-.894.448l-3-6a.5.5 0 0 1 0-.448l3-6a.5.5 0 0 1 .67-.223"
            />
          </svg>
        </button>
        <h1>Change password</h1>
      </div>
      <div className={style["content"]}>
        <div className={style["input-decoration"]}>
          <input
            type="password"
            required={true}
            name="new_password"
            id="new_password"
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          ></input>
          <span>New password</span>
        </div>
        <div className={style["input-decoration"]}>
          <input
            type="password"
            required={true}
            name="confirm_new_password"
            id="confirm_new_password"
            onChange={(e) => {
              setConfirmNewPassword(e.target.value);
            }}
          ></input>
          <span>Confirm new password</span>
        </div>
        <button
          className={style["update-button"]}
          onClick={() => updatePassword()}
        >
          Update
        </button>
      </div>
    </div>
  );
}
