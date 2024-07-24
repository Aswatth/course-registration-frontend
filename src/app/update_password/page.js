"use client";
import { useRouter } from "next/navigation";
import style from "./update_password.module.css";
import { useState } from "react";
import toast from "react-hot-toast";

import { UpdatePassword } from "@/app/(clients)/update_password_client";
import * as PasswordValidator from "@/app/(utils)/password_validator";

export default function ChangePassword() {
  const [password_validation_data, setPasswordValidationData] = useState(
    PasswordValidator.InitialValue()
  );
  const [new_password, setNewPassword] = useState("");
  const [confirm_new_password, setConfirmNewPassword] = useState("");

  const router = useRouter();

  function password_validation_icon(value) {
    if (value)
      return (
        <div
          style={{ color: "hsl(var(--green-accent800))", display: "inline" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-check"
            viewBox="0 0 16 16"
          >
            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
          </svg>
        </div>
      );
    else {
      return (
        <div style={{ color: "hsl(var(--red-accent600))", display: "inline" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-x"
            viewBox="0 0 16 16"
          >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
          </svg>
        </div>
      );
    }
  }

  function updatePassword() {
    if (new_password == "" && confirm_new_password == "") {
      toast.error("New password cannot be empty");
      return;
    }
    if (new_password != confirm_new_password) {
      toast.error("Password does not match!");
      return;
    }

    if (
      !password_validation_data.has_digit ||
      !password_validation_data.has_upper_case ||
      !password_validation_data.has_special_char ||
      !password_validation_data.has_length
    ) {
      toast.error("Password does not satisfy given constraints");
      return;
    }

    UpdatePassword(new_password).then((response) => {
      if (response == null || response == undefined) {
        toast.success("Successfully updated password");
        router.back();
      } else {
        toast.error(response["response"]);
      }
    });
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

              setPasswordValidationData(
                PasswordValidator.Validate(e.target.value)
              );
            }}
          ></input>
          <span>New password</span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            marginBottom: " calc(var(--default-margin) * 15)",
          }}
        >
          <div>
            {password_validation_icon(password_validation_data.has_digit)}
            <span>Contains a digit</span>
          </div>
          <div>
            {password_validation_icon(password_validation_data.has_upper_case)}
            <span>Contains a upper case letter</span>
          </div>
          <div>
            {password_validation_icon(
              password_validation_data.has_special_char
            )}
            <span>
              Contains a special character [!, @, #, $, %, ^, &, *, (, )]
            </span>
          </div>
          <div>
            {password_validation_icon(password_validation_data.has_length)}
            <span>Has 8-16 characters</span>
          </div>
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
