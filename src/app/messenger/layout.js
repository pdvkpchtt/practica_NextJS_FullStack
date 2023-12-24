"use server";

import { getServSession } from "../../app/api/auth/[...nextauth]/route";
import MsgLayoutWrap from "../../components/messenger/MsgLayoutWrap";

const TestLayout = async ({ children }) => {
  const session = await getServSession();

  return <MsgLayoutWrap role={session?.user?.role}>{children}</MsgLayoutWrap>;
};

export default TestLayout;
