"use server";
import * as admin_client from "../../(clients)/admin_client";

export async function getProfessors() {
  const respone = await admin_client.GetAllProfessors();

  if (respone.status == 200) {
    const body = await respone.json();
    return body;
  } else {
    return null;
  }
}
