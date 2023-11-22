"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { getSubscrs } from "./getSubscrs";

export async function fetchGetSubscripts(id, cursor, input) {
  // const session = await getServSession();

  const data = await getSubscrs(id, cursor, input);
  return data;
}
