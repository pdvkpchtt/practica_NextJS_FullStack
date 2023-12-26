"use server";

import { getServSession } from "../../app/api/auth/[...nextauth]/route";
import MsgLayoutWrap from "../../components/messenger/MsgLayoutWrap";

const TestLayout = async ({ children }) => {
  const session = await getServSession();
  console.log(session?.user?.role, "sex");

  return <MsgLayoutWrap role={session?.user?.role}>{children}</MsgLayoutWrap>;
};

export default TestLayout;
