"use server";

import { getCompanies } from "./getCompanies";

export async function fetchCompanies(cursor, filters) {
  const users = await getCompanies(cursor, filters);

  return users;
}
