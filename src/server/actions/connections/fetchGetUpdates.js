"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { getUpdates } from "./getUpdates";

export async function fetchGetUpdates(cursor) {
  const session = await getServSession();

  const data = await getUpdates(session.user.id, cursor);
  return data;
}
