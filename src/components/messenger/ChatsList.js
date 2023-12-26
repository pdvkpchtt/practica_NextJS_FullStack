"use client";

import { useContext, useEffect, useState } from "react";
import useInterval from "use-interval";
import { Waypoint } from "react-waypoint";
import { usePathname, useRouter } from "next/navigation";

import TextSecondary from "../../shared/Text/TextSecondary";
import CustomLoader from "../../shared/ui/CustomLoader";
import { MessengerSearchInput } from "../../shared/ui/Input";
import MessageCart from "./MessageCart";
import { MesContext } from "./MesContextWrap";
import { fetchChats } from "../../server/actions/messenger/fetchChats";
import Nav from "./Nav";
import ListForAllChats from "./ListForAllChats";
import ListForReplies from "./ListForReplies";

import CaseIcon from "../../shared/icons/CaseIcon";
import HandShakeIcon from "../../shared/icons/HandShakeIcon";

const ChatsList = ({ role }) => {
  const pathname = usePathname();
  const [searchInputValue, setSearchInputValue] = useState(""); // ChatsList

  const [navState, setNavState] = useState([
    {
      id: 0,
      active: true,
      component: role.includes("hr") ? <CaseIcon /> : <HandShakeIcon />,
    },
    {
      id: 1,
      active: false,
      component: role.includes("hr") ? <HandShakeIcon /> : <CaseIcon />,
    },
  ]);

  return (
    <>
      {/* list of chats */}
      <div
        className={`w-[260px] [@media(hover)]:mt-[62px] h-full [@media(pointer:coarse)]:w-[100%] flex-col ${
          pathname.includes("/messenger/") && "[@media(pointer:coarse)]:hidden"
        }`}
      >
        <div
          className="w-full px-[12px] 
          [@media(pointer:coarse)]:fixed [@media(pointer:coarse)]:top-0 [@media(pointer:coarse)]:left-0
          pt-[12px] [@media(pointer:coarse)]:pt-[8px]
          rounded-t-[20px] [@media(pointer:coarse)]:rounded-[0px] z-10 bg-white border-b-[0.7px] border-b-[#e7e7e7] dark:border-b-[#282828] dark:bg-[#212122]"
        >
          <MessengerSearchInput
            placeholder="Поиск"
            value={searchInputValue}
            onChange={(e) => setSearchInputValue(e)}
            showCross={searchInputValue.length != 0}
          />

          <div className="[@media(pointer:coarse)]:max-w-[500px] [@media(pointer:coarse)]:px-[12px] [@media(pointer:coarse)]:mx-auto">
            <Nav
              navState={navState}
              useState={(val) => setNavState(val)}
              layoutId="messenger"
              role={role}
            />
          </div>
        </div>

        {/* body */}
        <div
          className={`flex flex-col z-0 [@media(pointer:coarse)]:mt-[87px] [@media(pointer:coarse)]:h-[calc(100%-57px)] overflow-y-auto hideScrollbarNavMobile [@media(hover)]:h-[calc(100%-92px)] [@media(pointer:coarse)]:p-[12px] [@media(hover)]:rounded-b-[20px] [@media(pointer:coarse)]:gap-[8px] [@media(pointer:coarse)]:bg-transparent bg-white [@media(hover)]:dark:bg-[#212122]`}
        >
          {role.includes("hr") ? (
            <>
              {navState[0].active && (
                <ListForReplies
                  role={role}
                  searchInputValue={searchInputValue}
                  setSearchInputValue={setSearchInputValue}
                />
              )}
              {navState[1].active && (
                <ListForAllChats
                  role={role}
                  searchInputValue={searchInputValue}
                  setSearchInputValue={setSearchInputValue}
                />
              )}
            </>
          ) : (
            <>
              {navState[1].active && (
                <ListForReplies
                  role={role}
                  searchInputValue={searchInputValue}
                  setSearchInputValue={setSearchInputValue}
                />
              )}
              {navState[0].active && (
                <ListForAllChats
                  role={role}
                  searchInputValue={searchInputValue}
                  setSearchInputValue={setSearchInputValue}
                />
              )}
            </>
          )}
        </div>
        {/* body */}
      </div>
      {/* list of chats */}
    </>
  );
};

export default ChatsList;
