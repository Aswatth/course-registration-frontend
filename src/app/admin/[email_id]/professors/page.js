"use client";
import { useEffect, useState } from "react";
import * as utils from "@/app/(utils)/auth";
import * as admin_client from "@/app/(clients)/admin/professor_client";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function ProfessorsPage() {
  const router = useRouter();
  const params = useParams();
  const [professor_list, setProfessorList] = useState([]);
  useEffect(() => {
    const email_id = decodeURIComponent(params.email_id);
    utils.checkAuth("ADMIN", email_id).then(() => {
      admin_client.GetAllProfessors().then((value) => {
        if (value != null) {
          setProfessorList(value);
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
      <div>
        <button
          onClick={() => {
            router.push("professors/add");
          }}
        >
          Add new professor
        </button>
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
                      onClick={() =>
                        router.push("professors/edit/" + m.email_id)
                      }
                    >
                      Edit
                    </button>
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
      </div>
    );
  };

  return (
    <div>
      Professor page
      {professor_list.length == 0 ? no_content() : professor_content()}
    </div>
  );
}