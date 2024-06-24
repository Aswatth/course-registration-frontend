"use client";
import { useState } from "react";

export default function Login() {
  const [login_data, setLoginData] = useState({});

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      Login page
      <p>{JSON.stringify(login_data)}</p>
      <form onSubmit={onSubmit}>
        <label id="email_id">Email Id</label>
        <br></br>
        <input
          type="email"
          id="email_id"
          onChange={(e) =>
            setLoginData({ ...login_data, email_id: e.target.value })
          }
        ></input>
        <br></br>

        <label id="password">Password</label>
        <br></br>
        <input
          type="password"
          id="password"
          onChange={(e) =>
            setLoginData({ ...login_data, password: e.target.value })
          }
        ></input>
        <br></br>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
