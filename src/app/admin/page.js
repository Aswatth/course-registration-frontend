import * as utils from "../(utils)/auth";
import Link from "next/link";

export default function AdminHome() {
  utils.checkAuth();

  return (
    <div>
      <Link href={"/admin/students"}>Students</Link>
      <Link href={"/admin/professors"}>Professors</Link>
    </div>
  );
}
