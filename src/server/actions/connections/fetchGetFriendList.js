"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { getFriendList } from "./getFriendList";

export async function fetchGetFriendList(id, cursor, input) {
  // const session = await getServSession();

  const data = await getFriendList(id, cursor, input);
  return data;
}
