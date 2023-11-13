"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { getFiles } from "./getFiles";

export async function fetchFiles(vacId) {
  const session = await getServSession();

  const files = await getFiles(session?.user?.id, vacId);

  return files;
}
