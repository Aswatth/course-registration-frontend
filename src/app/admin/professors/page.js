import * as utils from "../../(utils)/auth";
import * as admin_client from "../../(clients)/admin_client";
import ProfessorList from "./professor_list";

export default async function ProfessorsPage() {
  const getProfessors = async () => {
    const respone = await admin_client.GetAllProfessors();

    if (respone.status == 200) {
      const body = await respone.json();
      return body;
    } else {
      return null;
    }
  };

  utils.checkAuth();

  return (
    <div>
      Students page
      <ProfessorList professor_list={await getProfessors()} />
    </div>
  );
}
