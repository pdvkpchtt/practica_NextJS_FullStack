import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "../../db";

export const deleteProfile = async () => {
  const session = await getServSession();

  const deletedAcc = await prisma.User.delete({
    where: {
      id: session?.user?.id,
    },
  });
};
