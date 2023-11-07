"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { getFiles } from "./getFiles";

export async function fetchFiles() {
  const session = await getServSession();

  const files = await getFiles(session?.user?.id);

  return files;
}
