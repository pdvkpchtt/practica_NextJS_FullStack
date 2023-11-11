"use client";

import { useParams, usePathname, useSearchParams } from "next/navigation";

import MesContextWrap from "../../components/messenger/MesContextWrap";
import ChatsList from "../../components/messenger/ChatsList";
import { useEffect } from "react";

const TestLayout = ({ children }) => {
  const pathname = usePathname();
  const searchParams = useParams();

  const chatId = searchParams.chatId;
  console.log(chatId, "kotopes");
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
        <ChatsList />
        {children}
      </MesContextWrap>
    </div>
  );
};

export default TestLayout;
