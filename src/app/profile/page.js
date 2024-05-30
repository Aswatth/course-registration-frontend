import style from "./profile_page.module.css";

export default function Profile() {
  return (
    <div className={style.profile_page}>
      <div className={style.header}>
        <h1>Edit profile</h1>
        <div className={style.header_actions}>
          <button>Home</button>
          <button>Browser courses</button>
          <button>Register courses</button>
          <button>My plan</button>
          <div className={style.profile}>AA</div>
        </div>
      </div>
      <div className={style.content}>
        <table>
          <tr>
            <th>Email Id</th>
            <td>abc@univ.edu</td>
          </tr>
          <tr>
            <th>First name</th>
            <td>
              <td>ABC</td>
            </td>
          </tr>
          <tr>
            <th>Last name</th>
            <td>XYZ</td>
          </tr>
          <tr>
            <th>Program enrolled</th>
            <td>MSCS</td>
          </tr>
        </table>
      </div>
    </div>
  );
}
