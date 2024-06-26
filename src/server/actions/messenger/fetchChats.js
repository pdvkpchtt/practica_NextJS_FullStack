"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { getListOfChats } from "./getListOfChats";
import { updateListOfChats } from "./updateListOfChats";

export async function fetchChats(
  lastDate,
  searchInputValue,
  isUpdate = false,
  forAll = false
) {
  const session = await getServSession();

  if (isUpdate) {
    const chats = await updateListOfChats(
      session.user.id,
      lastDate,
      searchInputValue,
      forAll
    );
    return chats;
  }
  const chats = await getListOfChats(
    session.user.id,
    lastDate,
    searchInputValue,
    forAll
  );

  return chats;
}
