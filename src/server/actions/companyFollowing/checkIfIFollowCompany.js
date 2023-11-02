"use server";
import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";

export const checkIfIFollowCompany = async (id) => {
  const session = await getServSession();

  const following = await prisma.user.findUnique({
    where: { id: session?.user?.id },
    select: { companiesIFollow: true },
  });

  const foundFriend = following?.companiesIFollow?.find(
    (item) => item.id === id
  );

  if (foundFriend !== undefined) return true;
  else return false;
};
