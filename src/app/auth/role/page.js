"use server";

import { getServSession } from "../../../app/api/auth/[...nextauth]/route";
import RolePage from "../../../components/auth/RolePage";

const RoleServer = async () => {
  const session = await getServSession();

  return <RolePage id={session?.user?.id} />;
};

export default RoleServer;
