"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import getMessages from "./getMessages";
import updateMessages from "./updateMessages";

export async function fetchMessages(
  chatId,
  cursor,
  searchInput,
  isUpdate = false
) {
  const session = await getServSession();

  if (isUpdate) {
    const data = await updateMessages(
      chatId,
      session?.user?.id,
      cursor,
      searchInput
    );
    return data;
  } else {
    const data = await getMessages(
      chatId,
      session?.user?.id,
      cursor,
      searchInput
    );
    return data;
  }
  // console.log(data);
}
