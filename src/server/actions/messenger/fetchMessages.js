"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import getMessages from "./getMessages";
import updateMessages from "./updateMessages";

export async function fetchMessages(
  chatId,
  cursor,
  searchInput,
  isUpdate = false,
  user_id
) {
  const session = await getServSession();

  if (isUpdate) {
    const data = await updateMessages(
      chatId,
      session?.user?.id,
      cursor,
      searchInput,
      user_id
    );
    return data;
  } else {
    const data = await getMessages(
      chatId,
      session?.user?.id,
      cursor,
      searchInput,
      user_id
    );
    return data;
  }
  // console.log(data);
}
