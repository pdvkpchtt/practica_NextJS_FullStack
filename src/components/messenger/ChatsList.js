"use client";

import { useContext, useEffect, useState } from "react";
import { Waypoint } from "react-waypoint";
import { usePathname, useRouter } from "next/navigation";

import TextSecondary from "../../shared/Text/TextSecondary";
import CustomLoader from "../../shared/ui/CustomLoader";
import { MessengerSearchInput } from "../../shared/ui/Input";
import MessageCart from "./MessageCart";
import { MesContext } from "./MesContextWrap";
import { fetchChats } from "../../server/actions/messenger/fetchChats";

const ChatsList = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { currentChatCursor } = useContext(MesContext);

  const [cursor, setCursor] = useState(""); // ChatsList
  const [lastDate, setLastDate] = useState(""); // ChatsList
  const [hasNextPage, setHasNextPage] = useState(true); // ChatsList
  const [loading, setLoading] = useState(false); // ChatsList
  const [chatsState, setChatsState] = useState(null); // ChatsList
  const [searchInputValue, setSearchInputValue] = useState(""); // ChatsList

  const getUserChatsWithTimer = async () => {
    console.log("timer fetching");
    if (loading) return;

    console.log(lastDate);
    const data = await fetchChats(lastDate, searchInputValue, true);
    console.log("chats update", data);

    if (loading) return;
    setChatsState(data?.data);

    // setCursor(data?.cursor);
    // setHasNextPage(data?.hasNextPage);
  };

  const getUserChats = async () => {
    console.log("fetching");
    // if (loading) return;
    setLoading(true);
    const data = await fetchChats(cursor, searchInputValue, false);
    console.log("client chats", data);
    if (cursor?.length) {
      setChatsState([...chatsState, ...data.data]);
    } else {
      setChatsState(data.data);
    }
    setCursor(data.cursor);
    setHasNextPage(data.hasNextPage);
    setLastDate(data.lastDate);
    setLoading(false);
  };

  useEffect(() => {
    getUserChatsWithTimer();
    const timer = setInterval(() => {
      console.log("chat list timer");
      getUserChatsWithTimer();
    }, [5000]);

    return () => {
      clearInterval(timer);
    };
  }, [currentChatCursor]);

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
          py-[12px] [@media(pointer:coarse)]:py-[8px]
          rounded-t-[20px] [@media(pointer:coarse)]:rounded-[0px] z-10 bg-white border-b-[0.7px] border-b-[#e7e7e7] dark:border-b-[#282828] dark:bg-[#212122]"
        >
          <MessengerSearchInput
            placeholder="Поиск"
            value={searchInputValue}
            onChange={(e) => setSearchInputValue(e)}
            showCross={searchInputValue.length != 0}
          />
        </div>

        {/* body */}
        <div
          className={`flex flex-col z-0 [@media(pointer:coarse)]:mt-[57px] [@media(pointer:coarse)]:h-[calc(100%-57px)] overflow-y-auto hideScrollbarNavMobile [@media(hover)]:h-[calc(100%-65px)] [@media(pointer:coarse)]:p-[12px] [@media(hover)]:rounded-b-[20px] [@media(pointer:coarse)]:gap-[8px] [@media(pointer:coarse)]:bg-transparent bg-white [@media(hover)]:dark:bg-[#212122]`}
        >
          {loading || !chatsState ? (
            <div className="w-full flex justify-center items-center h-full">
              <CustomLoader diameter={36} />
            </div>
          ) : chatsState?.length === 0 ? (
            searchInputValue.length > 0 ? (
              <div className="flex flex-col gap-[8px] p-[16px]">
                <TextSecondary
                  text="Ничего не найдено"
                  style={
                    "h-full w-full flex justify-center items-center select-none"
                  }
                />
              </div>
            ) : (
              <div className="flex flex-col gap-[8px] p-[16px]">
                <TextSecondary
                  text="Диалогов еще нет"
                  style="font-medium text-[16px] leading-[20px] tracking-[-0.015em] select-none"
                />
                <TextSecondary
                  text="Свяжитесь с участником и начните обсуждение для развития своей карьеры"
                  style="font-normal text-[13px] leading-[15.6px] tracking-[-0.027em] select-none"
                />
              </div>
            )
          ) : (
            <>
              {chatsState.map((item, key) => (
                <MessageCart
                  key={key}
                  item={item}
                  onClick={() => router.push(`/messenger/${item.id}`)}
                  last={key == chatsState.length - 1}
                />
              ))}
              {hasNextPage ? (
                <Waypoint
                  onEnter={async () => {
                    console.log("Enter waypoint");
                    await getUserChats();
                  }}
                  topOffset="50px"
                >
                  <div className="w-full flex justify-center items-center h-full">
                    <CustomLoader diameter={36} />
                  </div>
                </Waypoint>
              ) : null}
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
