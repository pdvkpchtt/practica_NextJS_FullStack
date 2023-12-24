"use client";

import { useParams, usePathname } from "next/navigation";

import MesContextWrap from "../../components/messenger/MesContextWrap";
import ChatsList from "../../components/messenger/ChatsList";

const MsgLayoutWrap = ({ children, role }) => {
  const pathname = usePathname();
  const searchParams = useParams();

  const chatId = searchParams.chatId;

  return (
    <div
      className={`flex ${
        pathname === "/messenger" && "[@media(pointer:coarse)]:mb-[80px]"
      } ${
        pathname !== "/messenger" &&
        pathname.includes("/messenger/") &&
        "[@media(pointer:coarse)]:mt-[57px] [@media(pointer:coarse)]:pb-[143px]"
      } [@media(pointer:coarse)]:overflow-y-hidden h-full flex-row gap-[16px] w-full`}
    >
      <MesContextWrap chatId={chatId}>
        <ChatsList role={role} />
        {children}
      </MesContextWrap>
    </div>
  );
};

export default MsgLayoutWrap;
