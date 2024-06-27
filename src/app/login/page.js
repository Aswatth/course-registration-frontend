import { cookies } from "next/headers";
import * as login_client from "../(clients)/login_client";
import { redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export default async function Login() {
  async function validateLogin(formData) {
    "use server";
    const email_id = formData.get("email_id");
    const password = formData.get("password");

    const response = await login_client.login({
      email_id: email_id,
      password: password,
    });

    const res_body = await response.json();

    if (response.status == 200) {
      const token = res_body["token"];
      cookies().set(process.env.NEXT_PUBLIC_COOKIE_NAME, "Bearer " + token);
      const decoded_token = jwtDecode(token);
      redirect("/" + decoded_token["user_type"].toLowerCase());
    } else {
      redirect("/login");
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      Login page
      <form action={validateLogin}>
        <label id="email_id">Email Id</label>
        <br></br>
        <input type="email" name="email_id" id="email_id"></input>
        <br></br>

        <label id="password">Password</label>
        <br></br>
        <input type="password" name="password" id="password"></input>
        <br></br>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
