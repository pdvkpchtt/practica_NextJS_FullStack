"use server";

import { getFollowers } from "./getFollowers";

export async function fetchFollowers(companyId, cursor, input) {
  //   const session = await getServSession();

  const data = await getFollowers(companyId, cursor, input);
  return data;
}
