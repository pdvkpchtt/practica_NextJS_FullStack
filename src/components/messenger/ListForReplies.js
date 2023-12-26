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

const ListForReplies = ({ searchInputValue, navState, role }) => {
  const router = useRouter();

  const { currentChatCursor } = useContext(MesContext);

  const [cursor, setCursor] = useState(""); // ChatsList
  const [lastDate, setLastDate] = useState(""); // ChatsList
  const [hasNextPage, setHasNextPage] = useState(true); // ChatsList
  const [loading, setLoading] = useState(false); // ChatsList
  const [chatsState, setChatsState] = useState(null); // ChatsList

  const getUserChatsWithTimer = async () => {
    console.log("timer fetching 2");
    if (loading) return;

    console.log(lastDate);
    const data = await fetchChats(lastDate, searchInputValue, true, [
      "vacancyReply",
      "vacancyReplyDeclined",
    ]);
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
    const data = await fetchChats(cursor, searchInputValue, false, [
      "vacancyReply",
      "vacancyReplyDeclined",
    ]);
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

  const [delay, setDelay] = useState(2000);
  const [isRunning, setIsRunning] = useState(true);

  useInterval(
    () => {
      getUserChatsWithTimer();
    },
    navState[0].active ? delay : null
  );

  useEffect(() => {
    getUserChats();
  }, []);

  return (
    <>
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
              text={role.includes("hr") ? "Будьте активнее" : "Будь активнее"}
              style="font-medium text-[16px] leading-[20px] tracking-[-0.015em] select-none"
            />
            <TextSecondary
              text={
                role.includes("hr")
                  ? "Отправьте приглашение понравившемуся соискателю или дождитесь откликов"
                  : "Чтобы здесь появились диалоги, отправляй отклики на интересующие вакансии"
              }
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
    </>
  );
};

export default ListForReplies;
