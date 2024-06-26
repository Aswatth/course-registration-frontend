import { cookies } from "next/headers";

const API = process.env.NEXT_PUBLIC_API;

export const login = async (credential) => {
  try {
    const response = await fetch(API + "/login", {
      method: "POST",
      body: JSON.stringify(credential),
    });
    return response;
  } catch {
    console.log("CANNOT LOG IN");
  }
};
