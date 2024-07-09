"use server";

import { getVerifyFiles } from "./getVerifyFiles";

export async function fetchVerifyFiles(compId) {
  const files = await getVerifyFiles(compId);

  return files;
}
