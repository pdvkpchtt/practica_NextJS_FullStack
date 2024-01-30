"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { createVacancy } from "./createVacancy";

export async function createVacancyHandler(data, companyId) {
  const session = await getServSession();

  const res = await createVacancy(
    session.user.id,
    data,
    session.user.role,
    companyId
  );

  return res;
}
