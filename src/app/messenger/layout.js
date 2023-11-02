"use client";

import { usePathname } from "next/navigation";

import MessengerContextWrap from "components/messenger/MessengerContextWrap";
import ListOfChats from "../../components/messenger/ListOfChats";

const MessengerLayout = ({ children }) => {
  const pathname = usePathname();

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
      <MessengerContextWrap>
        <ListOfChats />
        {children}
      </MessengerContextWrap>
    </div>
  );
};

export default MessengerLayout;
