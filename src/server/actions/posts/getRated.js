"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { getRatedPosts } from "../getRatedPosts";

export async function getRated(otherId, cursor) {
  const session = await getServSession();

  const data = await getRatedPosts(session.user.id, cursor, otherId);
  return data;
}
