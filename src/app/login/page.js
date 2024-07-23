"use client";
import * as login_client from "@/app/(clients)/login_client";
import style from "./login.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [login_data, setLoginData] = useState(null);
  const [error_message, setErrorMessage] = useState("");

  function validateLogin() {
    if (login_data == null) {
      setErrorMessage("Email Id and Password cannot be empty");
    } else if (Object.keys(login_data).length != 2) {
      Object.keys(login_data).map((m) => {
        if (m == "email_id") {
          setErrorMessage("Password cannot be empty");
        } else {
          setErrorMessage("Email Id cannot be empty");
        }
      });
    } else {
      login_client.login(login_data).then((response) => {
        if (response.status == 200) {
          router.push(response.repsonse);
        } else {
          setErrorMessage(response.repsonse);
        }
      });
    }
  }

  const displayErrorMessage = () => {
    if (
      error_message == null ||
      error_message == undefined ||
      error_message.length == 0
    ) {
      return <div></div>;
    } else {
      return (
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "start",
          }}
        >
          <div className={style["error-message"]}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-exclamation-triangle-fill"
              viewBox="0 0 16 16"
              style={{ flex: 1 }}
            >
              <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
            </svg>
            <span style={{ flex: 1 }}>&nbsp; {error_message}</span>
          </div>
        </div>
      );
    }
  };

  return (
    <div className={style.login}>
      <div className={style["login-ui"]}>
        <div className={style["card"]}>
          <div className={style["card-title"]}>Log in</div>
          <div className={style["input-decoration"]}>
            <input
              type="email"
              required="required"
              id="email"
              name="email"
              onChange={(e) =>
                setLoginData({ ...login_data, email_id: e.target.value })
              }
            ></input>
            <span>Email</span>
          </div>
          <div className={style["input-decoration"]}>
            <input
              type="password"
              required="required"
              id="password"
              name="password"
              onChange={(e) =>
                setLoginData({ ...login_data, password: e.target.value })
              }
            ></input>
            <span>Password</span>
          </div>
          <button
            className={style["login-button"]}
            onClick={() => validateLogin()}
          >
            Log in
          </button>
          {displayErrorMessage()}
        </div>
      </div>
    </div>
  );
}
