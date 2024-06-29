"use client";
import { useEffect, useState } from "react";
import * as utils from "../../(utils)/auth";
import * as admin_actions from "@/app/admin/professors/actions";

export default function ProfessorsPage() {
  const [professor_list, setProfessorList] = useState([]);

  useEffect(() => {
    utils.checkAuth().then(() => {
      admin_actions.getProfessors().then((value) => {
        setProfessorList(value);
      });
    });    
  }, []);

  return (
    <div>
      Professor page
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
                  <button
                    onClick={() => {
                      console.log("editing");
                    }}
                  >
                    EDIT
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      console.log("deleting");
                    }}
                  >
                    DELETE
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
