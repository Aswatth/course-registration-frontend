"use client";
import { useEffect, useState } from "react";
import * as utils from "../../(utils)/auth";
import * as admin_client from "@/app/(clients)/admin/professor_client";

export default function ProfessorsPage() {
  const [professor_list, setProfessorList] = useState([]);

  useEffect(() => {
    utils.checkAuth().then(() => {
      admin_client.GetAllProfessors().then((value) => {
        if (value != null) {
          setProfessorList(value);
        } else {
        }
      });
    });
  }, []);

  const delete_professor = async (professor_email_id) => {
    admin_client.DeleteProfessor(professor_email_id).then(() => {
      setProfessorList(
        professor_list.filter((f) => f.email_id != professor_email_id)
      );
    });
  };

  const no_content = () => {
    return <div>No content</div>;
  };

  const professor_content = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Email Id</th>
            <th>Designation</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {professor_list.map((m) => {
            return (
              <tr>
                <td>{m.first_name}</td>
                <td>{m.last_name}</td>
                <td>{m.email_id}</td>
                <td>{m.designation}</td>
                <td>{m.department}</td>
                <td>
                  <button onClick={() => {}}>EDIT</button>
                </td>
                <td>
                  <button onClick={() => delete_professor(m.email_id)}>
                    DELETE
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      Professor page
      {professor_list.length == 0 ? no_content() : professor_content()}
    </div>
  );
}
