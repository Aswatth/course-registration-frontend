import * as admin_client from "../../(clients)/admin_client";
import StudentList from "./student_list";

export default async function StudentsPage() {
  const getStudents = async () => {
    const respone = await admin_client.GetAllStudents();

    if (respone.status == 200) {
      const body = await respone.json();
      return body;
    } else {
      return null;
    }
  };
  return (
    <div>
      Students page
      <StudentList student_list={await getStudents()} />
    </div>
  );
}
